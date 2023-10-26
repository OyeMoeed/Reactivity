import {StyleSheet, View} from 'react-native';

import React from 'react';
import Routes from './src/navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
