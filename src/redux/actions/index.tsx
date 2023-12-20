import firebase from '@react-native-firebase/app';
import {
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POST_STATE_CHANGE,
} from '../constants';

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
      .collection('Posts')
      .doc(firebase.auth().currentUser?.uid)
      .collection('Uploads')
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

export function fetchUserfollowing() {
  return dispatch => {
    const unsubscribe = firebase
      .firestore()
      .collection('Following')
      .doc(firebase.auth().currentUser?.uid)
      .collection('isFollowing')
      .onSnapshot(snapshot => {
        if (snapshot) {
          let following = snapshot.docs.map(doc => {
            const id = doc.id;
            return {id};
          });

          dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});

          for (let i = 0; i < following.length; i++) {
            console.log('Inside for loop, iteration:', i);

            dispatch(fetchUsersData(following[i]));
          }
        } else {
          // Handle the case where the snapshot is null (possibly due to sign-out)
          console.log('Snapshot is null. User may have signed out.');
        }
      });

    // Returning the unsubscribe function for cleanup
    return () => unsubscribe();
  };
}

export function fetchUsersData(uid, getPosts) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some(el => el.uid === uid);
    console.log('UID FOUND', uid);
    if (!found) {
      firebase
        .firestore()
        .collection('Users')
        .doc(uid.id)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            dispatch({type: USERS_DATA_STATE_CHANGE, user});
            dispatch(fetchUsersFollowingData(user.uid)); // Pass the user's UID
            console.log('User UID', user.uid);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } else {
      if (getPosts) {
        dispatch(fetchUsersFollowingData(uid)); // If user data is already present, just fetch following data
      }
    }
  };
}
export function fetchUsersFollowingData(uid) {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection('Posts')
      .doc(uid)
      .collection('Uploads')
      .orderBy('creation', 'asc')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          const uidFromSnapshot = snapshot.docs[0].ref.path.split('/')[1];
          let user = getState().usersState.users.find(
            el => el.uid === uidFromSnapshot,
          );
          console.log('ALALALAL', uidFromSnapshot);

          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data, user};
          });
          console.log('posts=>>>>>>>>>>>>>>', posts);
          dispatch({
            type: USERS_POST_STATE_CHANGE,
            posts,
            uid: uidFromSnapshot,
          });
          console.log('Dispatched');
          console.log(getState());
        } else {
          console.warn('No documents found in the snapshot for UID:', uid);
          // Handle the case where no documents are found, if needed
          // For example, you might dispatch an action to update the state with a specific flag
          // dispatch({ type: NO_DOCUMENTS_FOUND_ACTION, uid });
        }
      })
      .catch(error => {
        console.error('Error fetching users following data:', error);
      });
  };
}
