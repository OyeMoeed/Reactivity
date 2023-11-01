import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../container/Container';

const Post = () => {
  return (
    <Container>
      <TextInput placeholder="What's On Your Mind? " style={styles.text} />
    </Container>
  );
};

export default Post;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
});
