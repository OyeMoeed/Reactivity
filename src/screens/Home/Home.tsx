import React from 'react';
import Container from '../../container/AuthContainer';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostText from '../../components/PostText';
import PostImage from '../../components/PostImage';
import image from '../../assets/postImage.jpg';
import avatar from '../../assets/avatar.png';
import HomeContainer from '../../container/HomeContainer';
import Interactions from '../../components/Interactions';

const Home = () => {
  return (
    <HomeContainer>
      <Card>
        <UserInfotab source={avatar} />
        <PostText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu
          accumsan nisl, vitae vehicula tellus. Sed pharetra ligula vel sem
          congue, vitae mattis tortor tristique. Maecenas semper ut nisl eget
          posuere.
        </PostText>
        <PostImage source={image} />
        <Interactions />
      </Card>
      <Card>
        <UserInfotab source={avatar} />
        <PostText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu
          accumsan nisl, vitae vehicula tellus. Sed pharetra ligula vel sem
          congue, vitae mattis tortor tristique. Maecenas semper ut nisl eget
          posuere.
        </PostText>
        <Interactions />
      </Card>
    </HomeContainer>
  );
};

export default Home;
