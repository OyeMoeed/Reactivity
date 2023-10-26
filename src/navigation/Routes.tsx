import React from 'react';

import Login from '../screens/Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/Auth/Signup';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Signup} name="Signup" />
    </Stack.Navigator>
  );
}

export default Routes;
