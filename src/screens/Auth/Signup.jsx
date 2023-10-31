import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import Container from '../../container/Container';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';
import {AuthContext} from '../../firebase/AuthProvider';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {register} = useContext(AuthContext);

  return (
    <Container>
      <InputField
        placeholder="Enter Your Name"
        label="Name"
        value={name}
        onChange={username => setName(username)}
      />
      <InputField
        placeholder="Enter Your Email"
        label="Email"
        value={email}
        onChangeText={useremail => setEmail(useremail)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        placeholder="* * * * * * *"
        label="Password"
        value={password}
        onChangeText={userpassword => setPassword(userpassword)}
        autoCapitalize="none"
      />
      <InputField
        placeholder="********"
        label="Confirm Password"
        value={confirmPassword}
        onChange={confirmusrpassword => setConfirmPassword(confirmusrpassword)}
        secureTextEntry={true}
      />
      <StyledButton
        label="Create Acoount"
        onPress={() => register(email, password)}
      />
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
