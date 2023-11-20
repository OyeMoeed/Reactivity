import React, {useState} from 'react';
import {TextInput, StyleSheet, Image, View} from 'react-native';
import Container from '../../container/AuthContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StyledButton from '../../components/StyledButton';
import storage from '@react-native-firebase/storage';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/auth';

const Post = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageSelection = (response: ImagePickerResponse) => {
    if (!response.didCancel && response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      if (selectedImage.uri) {
        setImage(selectedImage.uri);
      }
    }
  };
  const generateUniqueFileName = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = new Date().getTime();
    return `${randomString}_${timestamp}.jpg`;
  };

  const handleImagePicker = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, handleImageSelection);
  };

  const handleCameraPicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchCamera(options, handleImageSelection);
  };

  const uploadImageToFirebase = async () => {
    try {
      if (image) {
        const imageName = generateUniqueFileName();
        const reference = storage()
          .ref()
          .child(`post/${firebase.auth().currentUser?.email}/${imageName}`);
        await reference.putFile(image);
        const downloadURL = await reference.getDownloadURL();
        console.log('Image uploaded. Download URL:', downloadURL);

        savePostData(downloadURL); // Pass the downloadURL to savePostData function
      } else {
        console.warn('No image selected.');
      }
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };

  const savePostData = async downloadUrl => {
    // Make sure savePostData is an async function
    try {
      const currentUser = firebase.auth().currentUser?.email;
      if (currentUser) {
        await firebase
          .firestore()
          .collection('posts')
          .doc(currentUser?.email)
          .collection('userPosts')
          .add({
            downloadUrl, // Use the passed downloadUrl value
            caption,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Optional timestamp field
          });

        console.log('Post data saved successfully.');
        navigation.reset({
          index: 0,
          routes: [{name: 'Feed'}],
        });
      } else {
        console.warn('User not authenticated.');
      }
    } catch (error) {
      console.error('Error saving post data:', error);
    }
  };
  return (
    <Container>
      {image && <Image source={{uri: image}} style={styles.selectedImage} />}
      <TextInput
        placeholder="What's On Your Mind? "
        multiline
        style={styles.text}
        onChangeText={text => setCaption(text)}
      />
      <StyledButton label="POST" onPress={uploadImageToFirebase} />
      <ActionButton>
        <ActionButton.Item
          title="Take Picture from Camera"
          onPress={handleCameraPicker}>
          <Icon name="camera" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          title="Upload from Gallery"
          onPress={handleImagePicker}>
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
  selectedImage: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 3,
  },
});
