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
import SocialButtons from '../../components/SocialButtons';
import Signup from './Signup';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  return (
    <Container>
      <View style={{height: '20%'}} />
      <InputField placeholder="Enter Your Email" label="Email" value={email} />
      <InputField placeholder="********" label="Password" />
      <StyledButton label="Sign In" onPress={() => Alert.alert('lalala')} />
      <View style={style.text}>
        <TouchableOpacity>
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
