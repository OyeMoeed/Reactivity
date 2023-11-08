import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../container/AuthContainer';
import StyledButton from '../../components/StyledButton';

const Post = () => {
  return (
    <Container>
      <TextInput
        placeholder="What's On Your Mind? "
        multiline
        style={styles.text}
      />
      <StyledButton label="POST" />
    </Container>
  );
};

export default Post;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    marginHorizontal: 25,
  },
});
