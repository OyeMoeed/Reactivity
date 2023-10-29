import React from 'react';

import Login from '../screens/Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/Auth/Signup';
import ResetPassword from '../screens/Auth/ResetPassword';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} options={{title: ''}} name="Login" />
      <Stack.Screen component={Signup} options={{title: ''}} name="Signup" />
      <Stack.Screen
        component={ResetPassword}
        options={{title: ''}}
        name="ResetPassword"
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
