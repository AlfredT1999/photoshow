// This is the first component function of this application.
// And makes the landing page for select between 
// Register option or Login option.

// Write in the keyboard rfc and it generates all 
// the nessesary code:

import React from 'react';
import { Button, View } from 'react-native';

/* View acts like div in HTML. */

export default function Landing( { navigation } ) {// navigation is a props.
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button 
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
            <Button 
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}
