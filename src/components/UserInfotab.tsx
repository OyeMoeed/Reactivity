import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import UserName from './UserName';
import FastImage from 'react-native-fast-image';
const UserInfotab = ({source, children}) => {
  return (
    <View style={style.UserInfobar}>
      <FastImage source={source} style={style.avatarSize} />

      <UserName>{children}</UserName>
    </View>
  );
};

export default UserInfotab;
const style = StyleSheet.create({
  UserInfobar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  avatarSize: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
});
