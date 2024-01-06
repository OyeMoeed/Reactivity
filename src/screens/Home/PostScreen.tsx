import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostText from '../../components/PostText';
import PostImage from '../../components/PostImage';
import Interactions from '../../components/Interactions';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import Avatar from '../../assets/avatar.png';

const PostScreen = ({following, usersLoaded, users, feed}) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (usersLoaded === following.length && following.length !== 0) {
        console.log('Following Users', following.length);

        feed.sort(function (x, y) {
          return y.creation - x.creation;
        });

        // Fetch and update like status for each post
        const updatedPosts = await Promise.all(
          feed.map(async post => {
            const likeDoc = await firebase
              .firestore()
              .collection('Posts')
              .doc(post.user.uid)
              .collection('Uploads')
              .doc(post.id)
              .collection('Likes')
              .doc(firebase.auth().currentUser?.uid)
              .get();

            return {
              ...post,
              isLiked: likeDoc.exists,
            };
          }),
        );

        setPosts(updatedPosts);
      }
    };

    fetchLikes();
  }, [usersLoaded, feed]);

  const onLike = ({postId, userId}) => {
    firebase
      .firestore()
      .collection('Posts')
      .doc(userId)
      .collection('Uploads')
      .doc(postId)
      .collection('Likes')
      .doc(firebase.auth().currentUser?.uid)
      .set({});

    // Update the local state for the specific post
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId && post.user.uid === userId
          ? {...post, isLiked: true}
          : post,
      ),
    );
  };

  const onDislike = ({postId, userId}) => {
    firebase
      .firestore()
      .collection('Posts')
      .doc(userId)
      .collection('Uploads')
      .doc(postId)
      .collection('Likes')
      .doc(firebase.auth().currentUser?.uid)
      .delete();

    // Update the local state for the specific post
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId && post.user.uid === userId
          ? {...post, isLiked: false}
          : post,
      ),
    );
  };

  const renderItem = ({item}) => (
    <Card>
      <UserInfotab
        onPress={() =>
          navigation.navigate('HomeProfile', {userId: item.user.uid})
        }
        source={{uri: item.user.avatarURL}}>
        {item.user.name}
      </UserInfotab>
      {item.downloadUrl && <PostImage source={{uri: item.downloadUrl}} />}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <PostText>{item.caption}</PostText>
      </View>
      <Text
        style={{
          fontSize: 8,
          paddingBottom: 10,
          color: '#808080',
          marginLeft: 10,
        }}>
        {item.creation}
      </Text>
      <Interactions
        Like={() =>
          item.isLiked
            ? onDislike({userId: item.user.uid, postId: item.id})
            : onLike({userId: item.user.uid, postId: item.id})
        }
        color={item.isLiked ? 'blue' : 'black'}
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
      />
    </ProfileContainer>
  );
};

const mapStateToProps = store => ({
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
  feed: store.usersState.feed,
});

export default connect(mapStateToProps, null)(PostScreen);
