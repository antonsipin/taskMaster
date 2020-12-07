import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import GroupScreen from '../screens/GroupScreen';
import TaskScreen from '../screens/TaskScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddImageScreen from '../screens/AddImageScreen';
import AddGroupScreen from '../screens/AddGroupScreen';

const Stack = createStackNavigator();

export default function AnotherStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen
        name='Main'
        component={MainScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name='Task' component={TaskScreen} />
      <Stack.Screen
        name='Group'
        component={GroupScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen name='Leaderboard' component={LeaderboardScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='AddImage' component={AddImageScreen} />
      <Stack.Screen name='AddGroup' component={AddGroupScreen} />
    </Stack.Navigator>
  );
}
