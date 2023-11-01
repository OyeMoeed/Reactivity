import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
const PostImage = ({source, ...props}) => {
  return (
    <View>
      <Image source={source} {...props} alt="/" style={style.postImageSize} />
    </View>
  );
};

export default PostImage;

const style = StyleSheet.create({
  postImageSize: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
});
