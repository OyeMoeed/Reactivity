import {StyleSheet, View} from 'react-native';

import React from 'react';
import Login from './src/screens/Auth/Login';

export default function App() {
  return (
    <View style={style.container}>
      <Login />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
