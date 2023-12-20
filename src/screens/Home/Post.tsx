import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  View,
  Modal,
  Text,
  ActivityIndicator,
} from 'react-native';
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
import HomeContainer from '../../container/HomeContainer';

const Post = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageSelection = (response: ImagePickerResponse) => {
    if (!response.didCancel && response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      if (selectedImage.uri) {
        setImage(selectedImage.uri);
      }
    }
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
        const imageRef = storage()
          .ref()
          .child(`post/${firebase.auth().currentUser?.email}/${imageName}`);

        const response = await fetch(image);
        const blob = await response.blob();

        // Track upload progress
        const uploadTask = imageRef.put(blob);
        uploadTask.on('state_changed', snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setUploadProgress(progress);
        });

        setUploading(true);

        await uploadTask;

        // Get the download URL from the snapshot
        const downloadURL = await imageRef.getDownloadURL();

        savePostData(downloadURL); // Pass the downloadURL to savePostData function
      } else {
        alert('No image selected.');
      }
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    } finally {
      setUploading(false);
    }
  };

  const savePostData = async downloadUrl => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const {uid} = currentUser;
        await firebase
          .firestore()
          .collection('Posts')
          .doc(uid)
          .collection('Uploads')
          .add({
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            downloadUrl,
            caption,
          });

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
    <HomeContainer>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {image && (
            <Image source={{uri: image}} style={styles.selectedImage} />
          )}
        </View>
        <TextInput
          placeholder="What's On Your Mind? "
          multiline
          style={styles.text}
          onChangeText={text => setCaption(text)}
        />
        <StyledButton label="POST" onPress={uploadImageToFirebase} />
      </View>

      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          title="Take Picture from Camera"
          onPress={handleCameraPicker}
          buttonColor="#3498db">
          <Icon name="camera" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          title="Upload from Gallery"
          onPress={handleImagePicker}
          buttonColor="#1abc9c">
          <Icon name="image" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

      <Modal visible={uploading} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#2e64e5" />
            <Text style={styles.progressText}>{uploadProgress}%</Text>
          </View>
        </View>
      </Modal>
    </HomeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    marginBottom: 20,
  },
  selectedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButtonIcon: {
    fontSize: 25,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2e64e5',
  },
});

const generateUniqueFileName = () => {
  const randomString = Math.random().toString(36).substring(7);
  const timestamp = new Date();
  timestamp.setMilliseconds(0); // Remove seconds and milliseconds
  return `${randomString}_${timestamp.toISOString()}.jpg`;
};

export default Post;
