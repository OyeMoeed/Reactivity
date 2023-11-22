import {firebase} from '@react-native-firebase/firestore';
import {USER_STATE_CHANGE} from '../constants';

export function fetchUser() {
  return dispatch => {
    firebase
      .firestore()
      .collection('user')
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then(snapshot => {
        console.log(snapshot.data());
        if (snapshot.exists) {
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
        } else {
          console.log('User Does Not Exist');
        }
      });
  };
}