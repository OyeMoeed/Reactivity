import React from 'react';
import HomeContainer from '../../container/HomeContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserInfotab from '../../components/UserInfotab';
import ChatCard from '../../components/ChatCard';
import avatar from '../../assets/avatar.png';

const Messages = ({item}) => {
  console.log('Item:', item); // Add this line for debugging

  const handlePress = () => {
    console.log('Card Pressed');
  };

  return (
    <HomeContainer>
      <ChatCard onPress={handlePress}>
        <UserInfotab source={avatar}>{item.name}</UserInfotab>
      </ChatCard>
      <ActionButton>
        <ActionButton.Item title="Start a new Chat" onPress={() => {}}>
          <Icon name="message" style={style.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </HomeContainer>
  );
};

const style = {
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
};

export default Messages;
