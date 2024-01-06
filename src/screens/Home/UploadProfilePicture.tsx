import React, {useState, useEffect} from 'react';
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
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const updateProfilePicture = async () => {
    const userId = firebase.auth().currentUser?.uid;

    try {
      const currentUser = firebase.auth().currentUser;

      if (profilePicture) {
        setUploading(true); // Set uploading to true when the process starts

        const imageName = 'profile_picture.jpg';
        const imageRef = storage().ref().child(`Users/${userId}/${imageName}`);

        // Delete the old profile picture if it exists
        const oldImageRef = storage()
          .ref()
          .child(`Users/${userId}/avatarURL/avatar.jpg`);
        await oldImageRef.delete().catch(error => {
          // Handle deletion error if the file doesn't exist
          if (error.code !== 'storage/object-not-found') {
            console.error('Error deleting old profile picture:', error);
          }
        });

        // Upload the new profile picture
        const response = await fetch(profilePicture);
        const blob = await response.blob();
        await imageRef.put(blob);

        // Get the download URL of the new profile picture
        const downloadURL = await imageRef.getDownloadURL();

        // Update user's profile picture URL in Firebase Authentication
        await currentUser?.updateProfile({
          photoURL: downloadURL,
        });

        // Update the avatarURL field in Firestore
        await firebase.firestore().collection('Users').doc(userId).update({
          avatarURL: downloadURL,
        });

        // Display success message or navigate to another screen
        Alert.alert('Success', 'Profile picture updated successfully');
        navigation.navigate('ProfileScreen');
      } else {
        // If no new profile picture is selected
        Alert.alert('Error', 'No profile picture selected');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    } finally {
      setUploading(false); // Set uploading to false when the process finishes
    }
  };

  useEffect(() => {
    // Clear the profile picture state when navigating back to this screen
    return () => setProfilePicture(null);
  }, []);

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
        onPress={updateProfilePicture}
        style={styles.uploadButton}
        disabled={uploading} // Disable the button while uploading
      >
        {uploading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
        )}
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
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UploadProfilePictureScreen;
