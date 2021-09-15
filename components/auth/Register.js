// Here I'm going to create a component. With a component we can
// use state. This is the Register component:

// I use rcc for generate the code:

import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp(){

    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="name" 
                    onChangeText= { (name) => this.setState({ name: name})}
                />
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
                    title="Sign Up"
                />
            </View>
        );
    }
}
