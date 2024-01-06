import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import {AuthContext} from '../../firebase/AuthProvider';
import AuthContainer from '../../container/AuthContainer';
import {useForm} from 'react-hook-form';

const Login = ({navigation}) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    try {
      setLoading(true);
      await login(data.loginEmail, data.loginPassword);
      // Simulate a delay of 5 seconds
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <AuthContainer>
        <InputField
          label="Email"
          name="loginEmail"
          control={control}
          rules={{required: 'Email is required'}}
          placeholder="Enter Your Email"
          autoCapitalize="none"
        />
        <InputField
          label="Password"
          name="loginPassword"
          control={control}
          rules={{required: 'Password is required'}}
          placeholder="********"
          secureTextEntry={true}
        />
        <StyledButton label="Sign In" onPress={handleSubmit(onSubmit)} />

        {loading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}

        <View style={styles.text}>
          <TouchableOpacity onPress={() => navigation.navigate(ResetPassword)}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.text}>
          <Text style={styles.signupText}>Need An Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
            <Text style={styles.signupLinkText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </AuthContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  signupText: {
    color: '#ffffff',
  },
  signupLinkText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Login;
