import {Text} from 'react-native';
import React, {useContext} from 'react';
import StyledButton from '../../components/StyledButton';
import {AuthContext} from '../../firebase/AuthProvider';
import Container from '../../container/AuthContainer';

const Profile = () => {
  const {signout} = useContext(AuthContext);

  return (
    <Container>
      <Text>Profile</Text>
      <StyledButton label="Log Out" onPress={() => signout()} />
    </Container>
  );
};

export default Profile;
