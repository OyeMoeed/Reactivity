import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const UserName = ({children}) => {
  return (
    <View style={style.userNametab}>
      <Text style={{fontSize: 12}}>{children}</Text>
    </View>
  );
};

export default UserName;
const style = StyleSheet.create({
  userNametab: {
    paddingLeft: 10,
  },
});
