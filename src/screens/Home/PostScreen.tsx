import React from 'react';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostText from '../../components/PostText';
import PostImage from '../../components/PostImage';
import HomeContainer from '../../container/HomeContainer';
import Interactions from '../../components/Interactions';
import {StyleSheet, Text} from 'react-native';

const PostScreen = ({item}) => {
  return (
    <HomeContainer>
      <Card>
        <UserInfotab source={item.userImg}>{item.userName}</UserInfotab>
        <PostText>{item.post}</PostText>
        <PostImage source={item.postImg} />
<<<<<<< HEAD
        <Text style={style.time}>{item.postTime}</Text>
=======
        <Text style={style.text}>{item.postTime}</Text>
>>>>>>> HomeScreen
        <Interactions />
      </Card>
    </HomeContainer>
  );
};

export default PostScreen;
<<<<<<< HEAD

const style = StyleSheet.create({
  time: {
    paddingVertical: 10,
    fontSize: 10,
    color: '#808080',
=======
const style = StyleSheet.create({
  text: {
    paddingVertical: 15,
>>>>>>> HomeScreen
  },
});
