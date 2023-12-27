import firebase from '@react-native-firebase/app';
import {
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_DATA_LIKE_CHANGE,
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
      .orderBy('creation', 'asc')
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
        const uidFromSnapshot = uid; // Assuming uid is the correct user ID
        let user = getState().usersState.users.find(
          el => el.uid === uidFromSnapshot,
        );

        if (snapshot.docs.length > 0) {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data, user};
          });

          for (let i = 0; i < posts.length; i++) {
            dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
          }

          dispatch({
            type: USERS_POST_STATE_CHANGE,
            posts,
            uid: uidFromSnapshot,
          });
        } else {
          // If there are no documents, dispatch an action with an empty array
          dispatch({
            type: USERS_POST_STATE_CHANGE,
            posts: [],
            uid: uidFromSnapshot,
          });

          console.warn('No documents found in the snapshot for UID:', uid);
          // Optionally, you can handle the case where no documents are found here
          // dispatch({ type: NO_DOCUMENTS_FOUND_ACTION, uid });
        }
      })
      .catch(error => {
        console.error('Error fetching users following data:', error);
      });
  };
}

export function fetchUsersFollowingLikes(uid, postId) {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection('Posts')
      .doc(uid)
      .collection('Uploads')
      .doc(postId)
      .collection('Likes')
      .doc(firebase.auth().currentUser?.uid)
      .onSnapshot(snapshot => {
        const postId = snapshot?.ZE?.path?.segments[3];

        let currentUserLikes = false;
        if (snapshot.exists) {
          currentUserLikes = true;
        }

        dispatch({
          type: USERS_DATA_LIKE_CHANGE,
          postId,
          currentUserLikes,
        });
      });
  };
}
