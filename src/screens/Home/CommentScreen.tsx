import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import Card from '../../components/Card'; // Make sure to import your Card component
import {firebase} from '@react-native-firebase/firestore';
import StyledButton from '../../components/StyledButton';
import {fetchUsersData} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const CommentScreen = ({route, props, users}) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');
  const {uid} = route.params;

  useEffect(() => {
    function matchUsersToComments(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty('user')) {
          continue;
        }
        const user = users.find(x => x.uid === comments[i].creator);
        if (user == undefined) {
          props.fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }
    console.log(uid.uid);

    if (route.params.postId !== postId) {
      firebase
        .firestore()
        .collection('Posts')
        .doc(uid.uid)
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
          console.log('id', id);
          matchUsersToComments(comments);
        });
      setPostId(route.params.postId);
    } else {
      matchUsersToComments(comments);
    }
  }, [route.params.postId, users]);

  const onCommentSend = () => {
    const {uid} = route.params;
    console.warn('Post Id', route.params.postId);
    firebase
      .firestore()
      .collection('Posts')
      .doc(uid.uid)
      .collection('Uploads')
      .doc(route.params.postId)
      .collection('Comments')
      .add({
        creator: firebase.auth().currentUser?.uid,
        text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };
  return (
    <View style={styles.container}>
      <Card>
        <FlatList
          data={comments}
          renderItem={({item}) => {
            console.warn('Lalalallalal', item.name); // Log the name property
            return (
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}>
                {item.user !== undefined ? <Text>{item.user}</Text> : null}
                <Text>{item.text}</Text>
              </View>
            );
          }}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          onChangeText={text => setText(text)}
        />
        <StyledButton
          label={'Submit'}
          style={styles.submitButton}
          onPress={onCommentSend}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    width: '100%',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const mapDispatchUser = dispatch =>
  bindActionCreators({fetchUsersData}, dispatch);
const mapDispatchStore = store => ({
  users: store.usersState.user,
});

export default connect(mapDispatchStore, mapDispatchUser)(CommentScreen);
