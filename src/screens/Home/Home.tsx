import {View, FlatList} from 'react-native';
import React from 'react';
import PostScreen from './PostScreen';
import Messages from './Messages';
const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../assets/avatar.png'),
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../assets/postImage.jpg'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../assets/avatar.png'),
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../assets/postImage.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../assets/avatar.png'),
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    // postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../assets/avatar.png'),
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    //postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const Home = () => {
  return (
    <View>
      <FlatList
        data={Posts}
        renderItem={({item}) => <PostScreen item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Home;
