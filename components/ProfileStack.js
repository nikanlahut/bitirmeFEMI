import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { View, Text } from 'react-native';
import Profile from './main/Profile'

const StackProfile = createStackNavigator();

export default function ProfileStack() {
    return (
        
          <StackProfile.Navigator>
            <StackProfile.Screen name="Profile" component={Profile} />
          </StackProfile.Navigator>
        
      );

}
