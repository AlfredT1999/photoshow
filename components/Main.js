// The Main.js will be the file that's called up after all the components
// inside the componets/auth folder:

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser, fetchUserPosts} from '../Redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return(null);
}

export class Main extends Component {
    componentDidMount() {
      this.props.fetchUser();
      this.props.fetchUserPosts();
    }
    render() {
        return (
            // It always initilize into the Feed.
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                    }}
                />

                <Tab.Screen name="Search" component={SearchScreen}  navigation={this.props.navigation}
                    options={{tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                    ),
                    }}
                />

                <Tab.Screen name="AddContainer" component={EmptyScreen} 
                    listeners={({navigation}) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
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
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch)

// Added mapStateToProps instead null means that I able to access the users data inside our component:
export default connect(mapStateToProps, mapDispatchProps)(Main)
