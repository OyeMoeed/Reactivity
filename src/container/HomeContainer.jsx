import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const HomeContainer = props => {
  return (
    <SafeAreaView style={style.bg} {...props}>
      {props.children}
    </SafeAreaView>
  );
};

export default HomeContainer;

const style = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
