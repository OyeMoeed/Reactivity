import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const PostImage = ({source, ...props}) => {
  if (source && source !== 'none') {
    return <FastImage source={source} {...props} style={style.postImageSize} />;
  }

  return null; // Return null if no image source is provided or if it's 'none'
};

export default PostImage;

const style = StyleSheet.create({
  postImageSize: {
    height: 300,
    marginTop: 10,
  },
});
