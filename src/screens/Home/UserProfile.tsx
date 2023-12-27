import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Avatar from '../../assets/avatar.png';
import FastImage from 'react-native-fast-image';

const UserProfile = ({currentUser, posts, following}) => {
  return (
    <ProfileContainer>
      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image source={Avatar} style={styles.profileImage} />
          <Text style={styles.editProfileText}>Edit Profile Picture</Text>
        </TouchableOpacity>
        <Text style={styles.username}>
          {currentUser ? currentUser.name : 'Loading...'}
        </Text>
        <View style={styles.userDetails}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>{following.length}</Text>
            <Text style={styles.detailLabel}>FOLLOWING</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>{posts.length}</Text>
            <Text style={styles.detailLabel}>POSTS</Text>
          </View>
        </View>
      </View>

      {posts && posts.length > 0 ? (
        <FlatList
          numColumns={3}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <FastImage
              source={{uri: item.downloadUrl}}
              style={styles.postImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          contentContainerStyle={styles.postList}
        />
      ) : (
        <View style={styles.nothingToShowContainer}>
          <Icons name="ban-outline" size={50} />
          <Text style={styles.nothingToShowText}>Nothing to show</Text>
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
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editProfileText: {
    fontSize: 10,
    color: 'blue', // Adjust color as needed
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  userDetails: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  detailContainer: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailLabel: {
    fontSize: 12,
    color: 'gray', // Adjust color as needed
  },
  postList: {
    paddingHorizontal: 5,
  },
  postImage: {
    width: '32%', // Adjust to your preference
    aspectRatio: 1,
    margin: 2,
    borderRadius: 10,
  },
  nothingToShowContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  nothingToShowText: {
    paddingTop: 10,
  },
});

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps)(UserProfile);
