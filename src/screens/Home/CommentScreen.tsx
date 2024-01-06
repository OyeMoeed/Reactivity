import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import StyledButton from '../../components/StyledButton';
import {fetchUsersData} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserInfotab from '../../components/UserInfotab';

const CommentScreen = ({route, users, fetchUsersData}) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    function matchUsersToComments(comments) {
      for (let i = 0; i > comments.length; i++) {
        console.log('Comments ', comments.length);
        if (comments[i].hasOwnProperty('user')) {
          continue;
        }
        const user = users.find(x => x.uid === comments[i].creator);
        if (user === undefined) {
          fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }

    if (route.params.postId !== postId) {
      firebase
        .firestore()
        .collection('Posts')
        .doc(route.params.uid.uid) // Assuming you want to use the uid from the route params
        .collection('Uploads')
        .doc(route.params.postId)
        .collection('Comments')
        .get()
        .then(snapshot => {
          let comments = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          matchUsersToComments(comments);
        });
      setPostId(route.params.postId);
    } else {
      matchUsersToComments(comments);
    }
  }, [route.params.postId, users, fetchUsersData]);

  const onCommentSend = async () => {
    const {uid} = route.params;
    const newComment = {
      creator: firebase.auth().currentUser?.uid,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      // Add the new comment to Firestore
      const docRef = await firebase
        .firestore()
        .collection('Posts')
        .doc(uid.uid)
        .collection('Uploads')
        .doc(route.params.postId)
        .collection('Comments')
        .add(newComment);

      // Update local state with the new comment
      setComments([...comments, {id: docRef.id, ...newComment}]);

      // Clear the input field
      setText('');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <View
            style={{
              borderBottomWidth: 0.25,
              marginHorizontal: 15,
              borderColor: '#808080',
              marginBottom: 5,
            }}>
            {item.user !== undefined ? (
              <UserInfotab source={{uri: item.avatarURL}}>
                {item.name}
              </UserInfotab>
            ) : null}
            <UserInfotab source={{uri: item.avatarURL}}>
              {item.name}
            </UserInfotab>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.commentInput}
        value={text}
        placeholder="Add a comment..."
        onChangeText={text => setText(text)}
      />
      <StyledButton
        label={'Submit'}
        style={styles.submitButton}
        onPress={onCommentSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 50,
    width: '100%',
  },
  commentContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginHorizontal: '5%',
    padding: 8,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
  },
});

const mapDispatchUser = dispatch =>
  bindActionCreators({fetchUsersData}, dispatch);
const mapDispatchStore = store => ({
  users: store.usersState.user,
});

export default connect(mapDispatchStore, mapDispatchUser)(CommentScreen);
