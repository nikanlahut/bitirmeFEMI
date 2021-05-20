import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import { View, Text } from 'react-native';
import Forum from './main/Forum'

const StackForum = createStackNavigator();

export default function ForumStack() {
    return (
        
          <StackForum.Navigator>
            <StackForum.Screen name="Forum" component={Forum} />
          </StackForum.Navigator>
        
      );

}