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
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (usersLoaded === following.length && following.length !== 0) {
      console.log('Following Users', following.length);

      feed.sort(function (x, y) {
        return y.creation - x.creation;
      });
      setPosts(feed);
    }
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

    // setIsLiked(true);
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

    // setIsLiked(false);
  };

  const renderItem = ({item}) => (
    <Card>
      <UserInfotab source={{uri: item.user.avatarURL}}>
        {item.user.name}
      </UserInfotab>
      <PostImage source={{uri: item.downloadUrl}} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            marginVertical: 15,
            fontSize: 9,
            fontWeight: '600',
            marginLeft: 5,
          }}>
          {item.user.name}
        </Text>
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
          isLiked
            ? onDislike(item.user.uid, item.id)
            : onLike(item.user.uid, item.id)
        }
        color={isLiked ? 'blue' : 'black'}
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
