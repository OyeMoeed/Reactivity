import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {createStackNavigator} from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons';
import ProfileContainer from '../../container/ProfileContainer';
import Card from '../../components/Card';
import UserInfotab from '../../components/UserInfotab';
import PostImage from '../../components/PostImage';
import PostText from '../../components/PostText';
import Interactions from '../../components/Interactions';
import Avatar from '../../assets/avatar.png';

const UserProfile = ({currentUser, posts, following, navigation}) => {
  const handleUploadPress = () => {
    navigation.navigate('Upload');
  };
  const renderItem = ({item}) => (
    <Card>
      <UserInfotab source={{uri: currentUser.avatarURL}}>
        {currentUser.name}
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
    </Card>
  );

  return (
    <ProfileContainer>
      <View style={styles.userInfo}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={handleUploadPress}>
          {currentUser.avatarURL ? (
            <FastImage
              source={{uri: currentUser.avatarURL}}
              style={styles.profileImage}
            />
          ) : (
            // Render an alternative image when avatarURL is not available
            <FastImage source={Avatar} style={styles.profileImage} />
          )}
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
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
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
    color: 'blue',
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
    color: 'gray',
  },
  postList: {
    paddingHorizontal: 5,
  },
  postImage: {
    width: '32%',
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
