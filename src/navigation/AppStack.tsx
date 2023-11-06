import React from 'react';
import Home from '../screens/Home/Home';
import Post from '../screens/Home/Post';
import Profile from '../screens/Home/Profile';
import Messages from '../screens/Home/Messages';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Home}
        name="HOME"
        options={{
          tabBarIcon: () => <Icon name="home" size={20} />,
        }}
      />
      <Tab.Screen
        component={Messages}
        name="MESSAGES"
        options={{
          tabBarIcon: () => (
            <Icon
              name="message"
              size={20}
              style={{
                fontFamily: 'MaterialIcons',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Post}
        name="POST"
        options={{
          tabBarIcon: () => (
            <Icon
              name="add"
              size={20}
              style={{
                fontFamily: 'MaterialIcons',
                backgroundColor: 'transparent',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Profile}
        name="PROFILE"
        options={{
          tabBarIcon: () => <Icon name="person" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
