import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const PostText = ({children}) => {
  return (
    <View style={{paddingVertical: 10, marginLeft: 5, }}>
      <Text style={{fontSize: 9}}>{children}</Text>
    </View>
  );
};

export default PostText;
