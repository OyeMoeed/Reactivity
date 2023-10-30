import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../container/Container';
import {AuthContext} from '../../firebase/AuthProvider';
import StyledButton from '../../components/StyledButton';
const Home = () => {
  const {signout} = useContext(AuthContext);
  return (
    <Container>
      <Text>Welcome</Text>
      <StyledButton label="Log Out" onPress={() => signout()} />
    </Container>
  );
};

export default Home;
