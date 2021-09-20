import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import firebase from 'firebase/app';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import { Component } from 'react';
import {View, Text} from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk));

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

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  // componentDidMount() is a hook that gets invoked right after 
  // a React component has been mounted aka after the first render() 
  // lifecycle.
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state;

    if(!loaded) {
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>
          Loading...
        </Text>
      </View>
    }

    if(!loggedIn) {
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
    
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
              <Stack.Screen 
              name="Main" 
              component={MainScreen} 
              options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
