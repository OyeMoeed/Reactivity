import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';

const UploadProfilePictureScreen = () => {
  const navigaton = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else if (response.error) {
        console.error('ImagePicker Error:', response.error);
      } else {
        // Update the state with the selected image URI
        setProfilePicture(response.assets[0]?.uri);
      }
    });
  };

  const uploadProfilePicture = async () => {
    try {
      const userId = firebase.auth().currentUser?.uid;

      // Get the current user's information
      const currentUser = firebase.auth().currentUser;

      if (profilePicture) {
        // Delete the old profile picture if it exists
        if (currentUser?.avatarURL) {
          const oldImageRef = storage().refFromURL(currentUser.avatarURL);
          await oldImageRef.delete();
        }

        // Upload the new profile picture
        const imageName = 'profile_picture.jpg';
        const imageRef = storage().ref().child(`Users/${userId}/${imageName}`);

        // Add the missing await keyword here
        const response = await fetch(profilePicture);
        const blob = await response.blob();
        await imageRef.put(blob);

        // Get the download URL of the new profile picture
        const downloadURL = await imageRef.getDownloadURL();

        // Update user's profile picture URL in Firebase Authentication
        await currentUser?.updateProfile({
          photoURL: downloadURL,
        });
        <ActivityIndicator size={30} />;
        // Display success message or navigate to another screen
        Alert.alert('Success', 'Profile picture updated successfully');
        navigaton.navigate('ProfileScreen');
      } else {
        // If no new profile picture is selected
        Alert.alert('Error', 'No profile picture selected');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageContainer}>
          {profilePicture ? (
            <Image source={{uri: profilePicture}} style={styles.profileImage} />
          ) : (
            <Text>Select Profile Picture</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={uploadProfilePicture}
        style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#2e64e5',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UploadProfilePictureScreen;
