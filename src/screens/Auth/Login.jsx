import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import Container from '../../container/Container';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import {AuthContext} from '../../firebase/AuthProvider';

const Login = ({navigation}) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const {login} = useContext(AuthContext);
  return (
    <Container>
      <InputField
        placeholder="Enter Your Email"
        label="Email"
        value={loginEmail}
        onChangeText={loginMail => setLoginEmail(loginMail)}
        autoCapitalize="none"
      />
      <InputField
        placeholder="********"
        label="Password"
        value={loginPassword}
        onChangeText={loginpass => setLoginPassword(loginpass)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <StyledButton
        label="Sign In"
        onPress={() => login(loginEmail, loginPassword)}
      />
      <View style={style.text}>
        <TouchableOpacity onPress={() => navigation.navigate(ResetPassword)}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={style.socialView}>
        <SocialButtons
          label="Continue With Facebook"
          backgroundColor="#898F9C"
        />
        <SocialButtons label="Continue With Google" backgroundColor="#4285F4" />
      </View>
      <View style={style.text}>
        <Text>Need An Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
          <Text> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Container>
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
