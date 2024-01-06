import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import AuthContainer from '../../container/AuthContainer';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import {AuthContext} from '../../firebase/AuthProvider';

const Signup = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {signup} = useContext(AuthContext);

  const [avatarSource, setAvatarSource] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    const {name, email, password} = data;

    try {
      setLoading(true);
      if (avatarSource && avatarSource.uri) {
        await signup(name, email, password, avatarSource);
      } else {
        throw new Error('Avatar source is undefined or does not have a URI.');
      }
      // Simulate a delay of 5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error during sign up:', error.message);
      setLoading(false);
      alert('Sign Up Unsuccessful');
    }
  };

  const handleImageSelection = (response: ImagePickerResponse) => {
    if (!response.didCancel && response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      if (selectedImage.uri) {
        setAvatarSource({uri: selectedImage.uri});
      }
    }
  };

  const handleImagePicker = () => {
    let options = {
      mediaType: 'photo',
      quality: 0.5,
    };
    launchImageLibrary(options, handleImageSelection);
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <AuthContainer>
        <TouchableOpacity onPress={handleImagePicker}>
          <View style={styles.avatarContainer}>
            {avatarSource ? (
              <Image source={{uri: avatarSource.uri}} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarPlaceholder}>Select Avatar</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <InputField
            label="Name"
            name="name"
            control={control}
            rules={{required: 'Name is required'}}
            placeholder="Enter Your Name"
          />
          <InputField
            label="Email"
            name="email"
            control={control}
            rules={{required: 'Email is required'}}
            placeholder="Enter Your Email"
            autoCapitalize="none"
          />
          <InputField
            label="Password"
            name="password"
            control={control}
            rules={{required: 'Password is required'}}
            placeholder="* * * * * * *"
            secureTextEntry
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            control={control}
            rules={{required: 'Confirm Password is required'}}
            placeholder="* * * * * * *"
            secureTextEntry
          />
          <StyledButton
            label="Create Account"
            onPress={handleSubmit(onSubmit)}
          />

          {loading && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}

          {Object.keys(errors).length > 0 && (
            <Text style={styles.errorText}>
              Please fill in all required fields.
            </Text>
          )}
        </View>
      </AuthContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  avatarPlaceholder: {
    fontSize: 16,
    color: 'gray',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Signup;
