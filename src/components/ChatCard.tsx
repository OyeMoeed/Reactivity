import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Card from './Card';
import HomeContainer from '../container/HomeContainer';

const ChatCard = ({children, onPress}) => {
  return (
    <HomeContainer>
      <TouchableOpacity onPress={onPress}>
        <Card>
          <View>{children}</View>
        </Card>
      </TouchableOpacity>
    </HomeContainer>
  );
};

export default ChatCard;
