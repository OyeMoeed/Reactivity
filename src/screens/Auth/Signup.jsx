import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import Container from '../../container/AuthContainer';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import SocialButtons from '../../components/SocialButtons';
import {AuthContext} from '../../firebase/AuthProvider';
import AuthContainer from '../../container/AuthContainer';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {register} = useContext(AuthContext);
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      // Passwords do not match, display an error message or take appropriate action
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Proceed with registration if passwords match
    register(email, password);
  };

  return (
    <AuthContainer>
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
        placeholder="* * * * * * *"
        label="Password"
        value={confirmPassword}
        onChangeText={confirmusrpassword =>
          setConfirmPassword(confirmusrpassword)
        }
        autoCapitalize="none"
      />
      <StyledButton label="Create Acoount" onPress={handleSignUp} />
      <Text>OR</Text>
      <View>
        <SocialButtons
          label="Continue With Facebook"
          backgroundColor="#898F9C"
        />
        <SocialButtons label="Continue With Google" backgroundColor="#4285F4" />
      </View>
    </AuthContainer>
  );
};

export default Signup;
