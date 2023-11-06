import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import Container from '../../container/AuthContainer';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';
import {AuthContext} from '../../firebase/AuthProvider';
import AuthContainer from '../../container/AuthContainer';
import {useForm} from 'react-hook-form';

const Signup = ({navigation}) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  const {register} = useContext(AuthContext);

  const onSubmit = data => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    register(data.email, data.password);
  };

  return (
    <AuthContainer>
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
        secureTextEntry={true}
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        control={control}
        rules={{required: 'Confirm Password is required'}}
        placeholder="* * * * * * *"
        secureTextEntry={true}
      />
      <StyledButton label="Create Account" onPress={handleSubmit(onSubmit)} />
      <Text>OR</Text>
      <SocialButtons />
    </AuthContainer>
  );
};

export default Signup;
