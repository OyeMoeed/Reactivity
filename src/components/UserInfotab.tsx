import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import UserName from './UserName';
const UserInfotab = ({source, children}) => {
  return (
    <View style={style.UserInfobar}>
      <Image source={source} alt="/" style={style.avatarSize} />

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
  },
  avatarSize: {
    height: 30,
    width: 30,
  },
});
