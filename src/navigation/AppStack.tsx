import {View, Text} from 'react-native';
import React from 'react';
import Home from '../screens/Home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Post from '../screens/Home/Post';
import Profile from '../screens/Home/Profile';
import Messages from '../screens/Home/Messages';

const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={Home} name="HOME" />
      <Tab.Screen component={Messages} name="MESSAGES" />
      <Tab.Screen component={Post} name="POST" />
      <Tab.Screen component={Profile} name="PROFILE" />
    </Tab.Navigator>
  );
};

export default AppStack;
