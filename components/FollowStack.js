import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import { View, Text } from 'react-native';
import Follow from './main/Follow'

const StackFollow = createStackNavigator();

export default function FollowStack() {
    return (
        
          <StackFollow.Navigator>
            <StackFollow.Screen name="Follow" component={Follow} />
          </StackFollow.Navigator>
        
      );

}