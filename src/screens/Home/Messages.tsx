import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HomeContainer from '../../container/HomeContainer';
import UserInfotab from '../../components/UserInfotab';
import Card from '../../components/Card';
import {FlatList} from 'react-native-gesture-handler';
import Chat from './Chat';

const Message = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../assets/avatar.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../assets/avatar.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../assets/avatar.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../assets/avatar.png'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../assets/avatar.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const Messages = ({navigation}) => {
  return (
    <HomeContainer>
      <FlatList
        data={Message}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {userName: item.userName})
            }>
            <Card>
              <UserInfotab source={item.userImg}>{item.userName}</UserInfotab>
              <Text>{item.messageText}</Text>
              <Text style={style.time}>{item.messageTime}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </HomeContainer>
  );
};

export default Messages;
const style = StyleSheet.create({
  time: {
    paddingVertical: 10,
    fontSize: 10,
    color: '#808080',
  },
});
