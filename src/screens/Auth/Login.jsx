import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';
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

  const onSubmit = data => {
    login(data.loginEmail, data.loginPassword);
  };

  return (
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
      <View style={style.text}>
        <TouchableOpacity onPress={() => navigation.navigate(ResetPassword)}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <SocialButtons />
      <View style={style.text}>
        <Text>Need An Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
          <Text> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};
export default Login;

const style = StyleSheet.create({
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialView: {
    marginVertical: 30,
  },
});
