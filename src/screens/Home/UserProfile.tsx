import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import ProfileContainer from '../../container/ProfileContainer';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
const UserProfile = ({currentUser, posts,}) => {
  return (
    <ProfileContainer>
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {currentUser ? currentUser.name : 'Loading...'}
        </Text>
        {/* Display additional user info as needed */}
      </View>

      <FlatList
        numColumns={3}
        data={posts}
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

export default connect(mapStateToProps)(UserProfile);
