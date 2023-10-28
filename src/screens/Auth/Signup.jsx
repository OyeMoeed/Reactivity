import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../container/Container';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <Container>
      <InputField placeholder="Enter Your Name" label="Name" value={name} onChange={(username)=>setName(username)} />
      <InputField placeholder="Enter Your Email" label="Email" value={email} onChange={(useremail)=> setEmail(useremail)} />
      <InputField placeholder="********" label="Password" value={password} onChange={(userpassword) => setPassword(userpassword)}  secureTextEntry={true}/>
      <InputField placeholder="********" label="Confirm Password" value={confirmPassword} onChange={(confirmusrpassword) => setConfirmPassword(confirmusrpassword)} secureTextEntry={true} />
      <StyledButton label="Create Acoount" />
<Text>OR</Text>
      <View>
        <SocialButtons
          label="Continue With Facebook"
          backgroundColor="#898F9C"
        />
        <SocialButtons label="Continue With Google" backgroundColor="#4285F4" />
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
});
