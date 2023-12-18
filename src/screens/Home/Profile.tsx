import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import StyledButton from '../../components/StyledButton';
import Icons from 'react-native-vector-icons/Ionicons';

const Profile = ({currentUser, posts, route, navigation, following}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      {
        const userSnapshot = await firebase
          .firestore()
          .collection('Users')
          .doc(route.params.uid)
          .get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          setUser(userData);
        } else {
          console.log('User Does Not Exist');
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
      }
      const updatedFollowing = following || [];
      const targetUid = route.params.uid;

      console.log('Updated Following:', updatedFollowing);
      console.log('Target UID:', targetUid);

      // Extract "id" property for comparison
      const isFollowing = updatedFollowing.some(user => user.id === targetUid);

      console.log('Is Following:', isFollowing);
      setIsFollowing(isFollowing);
    };

    fetchUserData();
  }, [route.params.uid, currentUser?.uid, following]);

  const onFollow = async () => {
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

        // setIsFollowing(true);
        console.log('User Followed');
      } else {
        console.warn('User not authenticated.');
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const onUnfollow = async () => {
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

        // setIsFollowing(false);
        console.log('User Unfollowed');
      } else {
        console.warn('User not authenticated.');
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const isOwnProfile = route.params.uid === currentUser?.uid;

  const handleFollowButton = () => {
    if (!isOwnProfile) {
      if (isFollowing) {
        return <StyledButton label="UNFOLLOW" onPress={onUnfollow} />;
      } else {
        return <StyledButton label="FOLLOW" onPress={onFollow} />;
      }
    }
    return null;
  };

  return (
    <ProfileContainer>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user ? user.name : 'Loading...'}</Text>
      </View>

      <View>{handleFollowButton()}</View>

      {userPosts && userPosts.length > 0 ? (
        <FlatList
          numColumns={3}
          data={userPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Image source={{uri: item.downloadUrl}} style={styles.postImage} />
          )}
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
