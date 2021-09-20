// The Main.js will be the file that's called up after all the components
// inside the componets/auth folder:

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from '../Redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './main/Feed'

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} />
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
