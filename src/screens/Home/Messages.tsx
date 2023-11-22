import React from 'react';
import HomeContainer from '../../container/HomeContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfotab from '../../components/UserInfotab';
import ChatCard from '../../components/ChatCard';
import avatar from '../../assets/avatar.png';
import {Text} from 'react-native';

const Messages = ({item, navigation}) => {
  return (
    <HomeContainer>
      <ChatCard>
        <UserInfotab source={avatar}>{item.name}</UserInfotab>
        <Text numberOfLines={1}>{item.post}</Text>
        <Text style={{paddingTop: 10, fontSize: 12, color: '#777777'}}>
          {item.postTime}
        </Text>
      </ChatCard>
    </HomeContainer>
  );
};

export default Messages;
