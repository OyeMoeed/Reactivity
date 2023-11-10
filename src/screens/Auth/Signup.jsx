import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import AuthContainer from '../../container/AuthContainer';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';
import {AuthContext} from '../../firebase/AuthProvider';

const Signup = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {signup} = useContext(AuthContext);

  const onSubmit = data => {
    const {email, password} = data;
    signup(email, password);
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
      <StyledButton label="Create Account" onPress={handleSubmit(onSubmit)} />
      {Object.keys(errors).length > 0 && (
        <Text style={styles.errorText}>
          Please fill in all required fields.
        </Text>
      )}
      <Text>OR</Text>
      <SocialButtons />
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Signup;
