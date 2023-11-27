import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';

const Profile = ({currentUser, posts, route, navigation}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  // const {uid} = route.params;
  console.log(route.params);

  useEffect(() => {
    if (route.params.uid === firebase.auth().currentUser?.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection('Users')
        .doc(route.params.uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            setUser(userData); // Set the retrieved user data
          } else {
            console.log('User Does Not Exist');
            // Handle scenario where the user doesn't exist in Firestore
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });

      firebase
        .firestore()
        .collection('posts')
        .doc(route.params.uid)
        .collection('uploads')
        .orderBy('creation', 'desc')
        .get()
        .then(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          setUserPosts(posts);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [route.params.uid, currentUser, posts]);

  // Render user information conditionally
  return (
    <ProfileContainer>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user ? user.name : 'Loading...'}</Text>
        {/* Display additional user info as needed */}
      </View>

      <FlatList
        numColumns={3}
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item.downloadUrl}} style={styles.postImage} />
        )}
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
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps)(Profile);
