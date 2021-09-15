import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import firebase from 'firebase/app';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpA9cIy0qo6y3zRjw7YfZFpH4UikrwxOc",
  authDomain: "photoshow-d0a9d.firebaseapp.com",
  projectId: "photoshow-d0a9d",
  storageBucket: "photoshow-d0a9d.appspot.com",
  messagingSenderId: "1083497335682",
  appId: "1:1083497335682:web:691a4bd8188bdcb8681d9b",
  measurementId: "G-F4DV83FQCN"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen 
      name="Landing" 
      component={LandingScreen} 
      options={{headerShown: false}} />
      <Stack.Screen 
      name="Register" 
      component={RegisterScreen} />
      <Stack.Screen 
      name="Login" 
      component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
