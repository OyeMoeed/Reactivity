import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const AuthContainer = props => {
  return (
    <SafeAreaView style={style.bg} {...props}>
      {props.children}
    </SafeAreaView>
  );
};

export default AuthContainer;

const style = StyleSheet.create({
  bg: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
});
