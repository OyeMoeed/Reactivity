import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import StyledButton from '../../components/StyledButton';
import Icons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import PostText from '../../components/PostText';
import UserInfotab from '../../components/UserInfotab';
import Card from '../../components/Card';
import PostImage from '../../components/PostImage';

const Profile = ({currentUser, posts, route, navigation, following}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userSnapshot = await firebase
          .firestore()
          .collection('Users')
          .doc(route.params.uid)
          .get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          setUser(userData);
        } else {
          // Handle scenario where the user doesn't exist in Firestore
        }

        const postsSnapshot = await firebase
          .firestore()
          .collection('Posts')
          .doc(route.params.uid)
          .collection('Uploads')
          .orderBy('creation', 'desc')
          .get();

        let fetchedPosts = postsSnapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });

        setUserPosts(fetchedPosts);
        setPostLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setPostLoading(false);
      }

      const updatedFollowing = following || [];
      const targetUid = route.params.uid;

      // Extract "id" property for comparison
      const isFollowing = updatedFollowing.some(user => user.id === targetUid);

      setIsFollowing(isFollowing);
    };

    fetchUserData();
  }, [route.params.uid, currentUser?.uid, following]);

  const onFollow = async () => {
    setIsLoading(true);

    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const followingUid = currentUser?.uid;
        const followedUid = route.params.uid;

        await firebase
          .firestore()
          .collection('Following')
          .doc(followingUid)
          .collection('isFollowing')
          .doc(followedUid)
          .set({});

        setIsFollowing(true);
        setIsLoading(false);
      } else {
        console.warn('User not authenticated.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error following user:', error);
      setIsLoading(false);
    }
  };

  const onUnfollow = async () => {
    setIsLoading(true);

    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const followingUid = currentUser?.uid;
        const followedUid = route.params.uid;

        await firebase
          .firestore()
          .collection('Following')
          .doc(followingUid)
          .collection('isFollowing')
          .doc(followedUid)
          .delete();

        setIsFollowing(false);
        setIsLoading(false);
      } else {
        console.warn('User not authenticated.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      setIsLoading(false);
    }
  };

  const isOwnProfile = route.params.uid === currentUser?.uid;
  const renderItem = ({item}) => (
    <Card>
      <UserInfotab source={{uri: user?.avatarURL}}>{user?.name}</UserInfotab>
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
    </Card>
  );

  const handleFollowButton = () => {
    if (!isOwnProfile) {
      if (isFollowing) {
        return (
          <View>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <StyledButton label="UNFOLLOW" onPress={onUnfollow} />
            )}
          </View>
        );
      } else {
        return (
          <View>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <StyledButton label="FOLLOW" onPress={onFollow} />
            )}
          </View>
        );
      }
    }
    return null;
  };

  return (
    <ProfileContainer>
      <View style={styles.userInfo}>
        <FastImage
          source={{uri: user?.avatarURL}}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user?.name || 'Loading...'}</Text>
      </View>

      <View>{handleFollowButton()}</View>

      {postLoading ? (
        <ActivityIndicator size="large" color="#2e64e5" />
      ) : userPosts && userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.postList}
        />
      ) : (
        <View style={styles.userInfo}>
          <Icons name="ban-outline" size={50} />
          <Text style={[styles.username, {paddingTop: 10}]}>
            Nothing to show
          </Text>
        </View>
      )}
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
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps)(Profile);
