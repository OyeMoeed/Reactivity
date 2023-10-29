import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../container/Container';
import {AuthContext} from '../../firebase/AuthProvider';
const Home = () => {
  return (
    <Container>
      <Text>Welcome</Text>
    </Container>
  );
};

export default Home;
