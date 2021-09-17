// The Main.js will be the file that's called up after all the components
// inside the componets/auth folder:

import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from '../Redux/actions/index'

export class Main extends Component {
    componentDidMount() {
      this.props.fetchUser();
    }
    render() {
        const {currentUser} = this.props;

        console.log(currentUser);

        if(currentUser === undefined){
            return (
                <View style={{flex: 1, justifyContent: 'center'}}></View>
            )
        }

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text>
                     {currentUser.name} is logged in.
                </Text>
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

// Added mapStateToProps instead null means that I able to access the users data inside our component:
export default connect(mapStateToProps, mapDispatchProps)(Main)
