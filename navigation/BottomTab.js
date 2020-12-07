import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileStack from '../navigation/ProfileStackNavigation';
import AnotherStackNavigator from '../navigation/AnotherStackNavigation';
import AllTasksScreen from '../screens/AllTasksScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={AnotherStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={'#fb5b5a'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='All Tasks'
        component={AllTasksScreen}
        options={{
          tabBarLabel: 'All Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='check' color={'#fb5b5a'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account'
              color={'#fb5b5a'}
              size={30}
            />
          ),
        }}
        
      />
    </Tab.Navigator>
  );
}
