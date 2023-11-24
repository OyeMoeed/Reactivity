import firebase from '@react-native-firebase/app';
import {USER_POST_STATE_CHANGE, USER_STATE_CHANGE} from '../constants';

export function fetchUser() {
  return dispatch => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const currentUserUid = currentUser.uid;
      firebase
        .firestore()
        .collection('Users')
        .doc(currentUserUid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            console.log(userData);
            dispatch({type: USER_STATE_CHANGE, currentUser: userData});
          } else {
            console.log('User Does Not Exist');
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    } else {
      console.log('No user is currently signed in');
    }
  };
}
export function fetchUserPosts() {
  return dispatch => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser?.uid)
      .collection('uploads')
      .orderBy('creation', 'desc')
      .get()
      .then(snapshot => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        dispatch({type: USER_POST_STATE_CHANGE, posts});
      });
  };
}
