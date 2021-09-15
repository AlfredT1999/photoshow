// Here I'm going to create a component. With a component we can
// use state. This is the Login component:

// I use rcc for generate the code:

import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase/app';
require('firebase/auth');

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onSignUp = this.onSignUp.bind(this);
    }

    // This method makes the authorization for sign in with the user email
    // and password:
    onSignUp(){
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="email" 
                    onChangeText= { (email) => this.setState({ email: email})}
                />
                <TextInput 
                    placeholder="password" 
                    secureTextEntry={true}// This makes the password field hidden.
                    onChangeText= { (password) => this.setState({ password: password})}
                />
                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign In"
                />
            </View>
        );
    }
}
