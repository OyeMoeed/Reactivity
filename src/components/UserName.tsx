import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const UserName = ({children, childrenTime}) => {
  return (
    <View style={style.userNametab}>
      <Text>{children}</Text>
      <Text>{childrenTime}</Text>
    </View>
  );
};

export default UserName;
const style = StyleSheet.create({
  userNametab: {
    paddingLeft: 20,
  },
});
