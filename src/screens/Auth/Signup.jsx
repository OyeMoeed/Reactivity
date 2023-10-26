import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../container/Container';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';

const Signup = () => {
  const [email, setEmail] = useState('');
  return (
    <Container>
      <InputField placeholder="Enter Your Email" label="Email" value={email} />
      <InputField placeholder="Enter Your Email" label="Email" value={email} />
      <InputField placeholder="********" label="Password" />
      <InputField placeholder="********" label="Password" />
      <StyledButton label="Create Acoount" />

      <View style={style.socialView}>
        <SocialButtons
          label="Continue With Facebook"
          backgroundColor="#898F9C"
        />
        <SocialButtons label="Continue With Google" />
      </View>
      <View style={style.text}>
        <Text>Already Have an Account?</Text>
        <TouchableOpacity>
          <Text> Sign In</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Signup;

const style = StyleSheet.create({
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialView: {
    marginVertical: 30,
  },
});
