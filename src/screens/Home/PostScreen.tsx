import React from 'react';
import Container from '../../container/AuthContainer';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostText from '../../components/PostText';
import PostImage from '../../components/PostImage';
import image from '../../assets/postImage.jpg';
import HomeContainer from '../../container/HomeContainer';
import Interactions from '../../components/Interactions';

const PostScreen = ({item}) => {
  return (
    <HomeContainer>
      <Card>
        <UserInfotab source={item.userImg}>
          {item.userName} {item.Time}{' '}
        </UserInfotab>
        <PostText>{item.post}</PostText>
        <PostImage source={item.postImg} />
        <Interactions />
      </Card>
    </HomeContainer>
  );
};

export default PostScreen;
