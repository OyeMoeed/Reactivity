import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

const ProfileContainer = props => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
});

export default ProfileContainer;
