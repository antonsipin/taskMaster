import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import MainStack from '../navigation/StackNavigation';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Auth' component={AuthScreen} />
      <Stack.Screen name='Main' component={MainStack} />
    </Stack.Navigator>
  );
}
