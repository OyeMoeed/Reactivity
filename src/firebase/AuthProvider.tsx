import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert('Incorrect Email or Password');
    }
  };

  const signup = async (name, email, password) => {
    try {
      const {user: createdUser} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore().collection('Users').doc(createdUser.uid).set({
        name,
        email,
      });
    } catch (e) {
      console.error('Registration Error:', e);
      alert('Sign Up Unsuccessful');
    }
  };

  const signout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      alert('Signout Unsuccessful');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        signout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
