import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const PostImage = ({source, ...props}) => {
  if (source && source !== 'none') {
    return (
      <View>
        <Image source={source} {...props} style={style.postImageSize} />
      </View>
    );
  }

  return null; // Return null if no image source is provided or if it's 'none'
};

export default PostImage;

const style = StyleSheet.create({
  postImageSize: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
});
