import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, useGoogleSignIn = false) => {
    try {
      if (useGoogleSignIn) {
        // Sign in with Google
        const googleCredential = await signInWithGoogle();
        return auth().signInWithCredential(googleCredential);
      } else {
        // Sign in with email and password
        await signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      handleAuthenticationError(error);
    }
  };

  const signInWithGoogle = async () => {
    // Get the user's ID token from Google Sign-In
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    return auth.GoogleAuthProvider.credential(idToken);
  };

  const signInWithEmailAndPassword = async (email, password) => {
    await auth().signInWithEmailAndPassword(email, password);
  };

  const handleAuthenticationError = error => {
    console.error('Authentication error:', error);
    alert('Incorrect Email or Password');
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
