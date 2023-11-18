import {View, FlatList} from 'react-native';
import React from 'react';
import Messages from './Messages';
const MessageData = [
  {
    id: '1',
    name: 'Jenny Doe',
    userImg: require('../../assets/avatar.png'),
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    name: 'John Doe',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    name: 'Ken William',
    userImg: require('../../assets/avatar.png'),
    postTime: '1 hours ago',
    post: 'lalalalalallala',
  },
  {
    id: '4',
    name: 'Selina Paul',
    userImg: require('../../assets/avatar.png'),
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    name: 'Christy Alex',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const ChatScreen = () => {
  return (
    <View>
      <FlatList
        data={MessageData}
        renderItem={({item}) => <Messages item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChatScreen;
