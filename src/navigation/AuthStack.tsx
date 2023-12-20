import React from 'react';

import Login from '../screens/Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/Auth/Signup';
import ResetPassword from '../screens/Auth/ResetPassword';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2e64e5', // Set the background color
        },
        headerTintColor: '#fff', // Set the text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        component={Login}
        options={{
          title: '',
          headerTransparent: true, // Make the header transparent
        }}
        name="Login"
      />
      <Stack.Screen
        component={Signup}
        options={{
          title: '',
          headerTransparent: true, // Make the header transparent
        }}
        name="Signup"
      />
      <Stack.Screen
        component={ResetPassword}
        options={{
          title: '',
          headerTransparent: true, // Make the header transparent
        }}
        name="ResetPassword"
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
