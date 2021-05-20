import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import firebase from 'firebase/app';

import {Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyAhDCXsk5t5pCnqXPLM37poW7WqvLdR4Z8",
  authDomain: "bitirme-9f1ff.firebaseapp.com",
  projectId: "bitirme-9f1ff",
  storageBucket: "bitirme-9f1ff.appspot.com",
  messagingSenderId: "1032077887656",
  appId: "1:1032077887656:web:92f1e79b5febfb2d941a9d",
  measurementId: "G-5VE3J9M3GZ"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import Main from './components/Main'
import Add from './components/main/Add'

const Stack = createStackNavigator();

import { View, Text } from 'react-native';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
    if(!user){
      this.setState({
        loggedIn: false,
        loaded: true
      })
    }else{
      this.setState({
        loggedIn: true,
        loaded: true,
      })
    }
  })
}

  render() {
    const{loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialouteName='Landing'>
          <Stack.Screen name ='Landing' component={LandingScreen} options = {{headerShown:'false'}}/>
          <Stack.Screen name ='SignUp' component={SignUp}/>
          <Stack.Screen name ='Login' component={Login}/>
        </Stack.Navigator> 
      </NavigationContainer>
      )
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name ='Main' component={Main} options = {{headerShown:false}}/>
          <Stack.Screen name ='Post Something' component={Add} />
        </Stack.Navigator> 
        </NavigationContainer>
      </Provider>
      
    )
  }
}

export default App


