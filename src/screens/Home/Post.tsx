import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../container/AuthContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StyledButton from '../../components/StyledButton';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
const Post = () => {
  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      console.log(response);
    });
  };

  const openCamera = () => {
    const cam = launchCamera();
    console.log('RESULT===>>', cam);
  };
  return (
    <Container>
      <TextInput
        placeholder="What's On Your Mind? "
        multiline
        style={styles.text}
      />
      <StyledButton label="POST" onPress={() => alert('BUTTON PRESSED')} />
      <ActionButton>
        <ActionButton.Item
          title="Take Picture from Camera"
          onPress={openCamera}>
          <Icon name="camera" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item title="Upload from Gallery" onPress={ImagePicker}>
          <Icon name="browse-gallery" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
};

export default Post;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    marginHorizontal: 25,
    paddingBottom: 10,
  },
  actionButtonIcon: {
    fontSize: 25,
    color: 'white',
  },
});
