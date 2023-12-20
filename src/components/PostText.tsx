import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const PostText = ({children}) => {
  return (
    <View style={{paddingVertical: 10}}>
      <Text>{children}</Text>
    </View>
  );
};

export default PostText;
