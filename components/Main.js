// The Main.js will be the file that's called up after all the components
// inside the componets/auth folder:

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from '../Redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedScreen from './main/Feed'
import AddScreen from './main/Add'
import ProfileScreen from './main/Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                    }}
                />

                <Tab.Screen name="Add" component={AddScreen} 
                    options={{tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus-blox" color={color} size={26}/>
                    ),
                    }}
                />
            
            
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

// Added mapStateToProps instead null means that I able to access the users data inside our component:
export default connect(mapStateToProps, mapDispatchProps)(Main)
