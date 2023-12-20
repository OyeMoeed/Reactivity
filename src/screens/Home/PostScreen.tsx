import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostText from '../../components/PostText';
import PostImage from '../../components/PostImage';
import Interactions from '../../components/Interactions';
import {useNavigation} from '@react-navigation/native';

const PostScreen = ({following, usersFollowingLoaded, users, currentUser}) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let posts = [];
    if (usersFollowingLoaded === following.length) {
      console.log('Followeing Users', following.length);
      for (let i = 0; i < following.length; i++) {
        const uidInFollowing = following[i].id;
        console.log('If statement', uidInFollowing.id);
        console.log('Users array', users); // Add this line
        const user = users.find(el => el.uid === uidInFollowing);
        console.log('User', user);

        if (user) {
          console.log('inside Post If');
          posts = [
            ...posts,
            ...user.posts.map(post => ({
              ...post,
              creation: post.creation.toString(),
            })),
          ];
          console.log(posts, 'Posts');
        } else {
          console.error('User not found');
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(posts);
    }
  }, [usersFollowingLoaded]);

  const renderItem = ({item}) => (
    <Card>
      <UserInfotab>{item.user.name}</UserInfotab>
      <PostImage source={{uri: item.downloadUrl}} />
      <PostText>{item.caption}</PostText>
      <Text style={{fontSize: 10, paddingBottom: 10, color: '#808080'}}>
        {item.creation}
      </Text>
      <Interactions
        Comment={() =>
          navigation.navigate('Comments', {postId: item.id, uid: item.user})
        }
      />
    </Card>
  );

  return (
    <ProfileContainer>
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
  following: store.userState.following,
  users: store.usersState.users,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(PostScreen);
