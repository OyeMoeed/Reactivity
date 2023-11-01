import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const PostText = ({children}) => {
  return (
    <View style={style.text}>
      <Text>{children}</Text>
    </View>
  );
};

export default PostText;
const style = StyleSheet.create({
  text: {
    marginBottom: 20,
  },
});
