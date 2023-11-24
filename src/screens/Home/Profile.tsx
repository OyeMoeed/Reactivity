import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Touchable} from 'react-native';
import {connect} from 'react-redux';
import HomeContainer from '../../container/HomeContainer';
import {fetchUserPosts} from '../../redux/actions'; // Import the fetchUserPosts action
import {AuthContext} from '../../firebase/AuthProvider';
import StyledButton from '../../components/StyledButton';

const Profile = ({currentUser, posts, fetchUserPosts}) => {
  useEffect(() => {
    fetchUserPosts(); // Fetch user posts when the component mounts
  }, [fetchUserPosts]); // Run only when fetchUserPosts changes
  const {signout} = useContext(AuthContext);

  return (
    <HomeContainer>
      <View style={{flex: 1 / 2}}>
        <Text>{currentUser.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <Image
              style={styles.imageDisplay}
              source={{
                uri: item.downloadUrl,
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <StyledButton label="Log Out" onPress={() => signout()} /> */}
    </HomeContainer>
  );
};

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

const mapDispatchToProps = {
  fetchUserPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  imageDisplay: {
    width: 130,
    height: 150,
    backgroundColor: '#7373733b',
    margin: 5,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
