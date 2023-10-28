import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../container/Container';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <InputField placeholder="Enter Your New Password" label="New Password" value={email} onChange={(useremail)=> setEmail(useremail)} />
      <InputField placeholder="********" label="Confirm Your Password" value={password} onChange={(userpassword) => setPassword(userpassword)} secureTextEntry={true}/>
      <StyledButton label="Update Password" onPress={() => alert('Password Updated')} />

    </Container>
  );
};

export default ResetPassword;

const style = StyleSheet.create({
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialView: {
    marginVertical: 30,
  },
});
