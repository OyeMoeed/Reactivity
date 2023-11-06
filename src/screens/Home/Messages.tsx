import {Text} from 'react-native';
import React from 'react';
import HomeContainer from '../../container/HomeContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Messages = () => {
  return (
    <HomeContainer>
      <Text>Messages</Text>
      <ActionButton>
        <ActionButton.Item title="Start a new Chat" onPress={() => {}}>
          <Icon name="camera" />
        </ActionButton.Item>
      </ActionButton>
    </HomeContainer>
  );
};

export default Messages;
