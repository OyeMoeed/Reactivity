import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostText from '../../components/PostText';
import PostImage from '../../components/PostImage';
import Interactions from '../../components/Interactions';

const PostScreen = ({following, users, usersLoaded}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let posts = [];
    console.log('Following', following);
    console.log('Posts Loaded', posts);
    console.log('usersLoaded', usersLoaded);
    if (usersLoaded === following.length) {
      for (let i = 0; i < following.length; i++) {
        console.log('Inside for , iteration:', i);
        const user = users.find(el => el.uid === following[i]);

        if (user != undefined) {
          console.log('Userssssssss', user);
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(posts);
      console.log('Posts Loaded', posts);
    } else {
      return console.log('Yo');
    }
  }, [usersLoaded, following, users]);

  const renderItem = ({item}) => (
    <Card>
      <UserInfotab>{item.user.name}</UserInfotab>
      <PostText>{item.user.caption}</PostText>
      <PostImage source={item.downloadUrl} />
      <Text>{item.creation}</Text>
      <Interactions />
    </Card>
  );

  return (
    <ProfileContainer>
      <Text>LALALALALLA</Text>
      <FlatList
        numColumns={1}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.postList}
      />
    </ProfileContainer>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postList: {
    paddingHorizontal: 5,
  },
  postImage: {
    width: '32.3%', // Show 3 images in a row
    aspectRatio: 1 / 1, // Maintain aspect ratio
    margin: 2,
    borderRadius: 10,
  },
});

const mapStateToProps = store => ({
  posts: store.userState.posts,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
});

export default connect(mapStateToProps, null)(PostScreen);
