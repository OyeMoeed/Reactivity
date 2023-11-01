import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const UserName = () => {
  return (
    <View style={style.userNametab}>
      <Text>userName</Text>
      <Text>Time</Text>
    </View>
  );
};

export default UserName;
const style = StyleSheet.create({
  userNametab: {
    paddingLeft: 20,
  },
});
