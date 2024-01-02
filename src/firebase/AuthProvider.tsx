import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';
import storage from '@react-native-firebase/storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, useGoogleSignIn = false) => {
    try {
      if (useGoogleSignIn) {
        const googleCredential = await signInWithGoogle();
        return auth().signInWithCredential(googleCredential);
      } else {
        await signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      handleAuthenticationError(error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.configure();
      const {idToken} = await GoogleSignin.signIn();
      return auth.GoogleAuthProvider.credential(idToken);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      // You might want to provide user feedback here
      throw error;
    }
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Email/Password Sign-In Error:', error);
      throw error;
    }
  };

  const handleAuthenticationError = error => {
    console.error('Authentication error:', error);
    alert('Incorrect Email or Password');
  };

  const signup = async (name, email, password, avatarSource) => {
    try {
      console.log('Avatar Source:', avatarSource);

      const {user: createdUser} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (!avatarSource || !avatarSource.uri) {
        console.error('Avatar source is undefined or does not have a URI.');
        alert('Sign Up Unsuccessful');
        return;
      }

      const avatarReference = storage().ref(
        `avatars/${createdUser.uid}/avatar.jpg`,
      );

      await avatarReference.putFile(avatarSource.uri);

      const avatarDownloadURL = await avatarReference.getDownloadURL();

      await createdUser.updateProfile({
        displayName: name,
        photoURL: avatarDownloadURL,
      });

      await firestore().collection('Users').doc(createdUser.uid).set({
        name,
        email,
        avatarURL: avatarDownloadURL,
      });

      console.log('User signed up successfully with avatar:', createdUser);
    } catch (error) {
      console.error('Registration Error:', error.message);
      alert('Sign Up Unsuccessful');
      throw error;
    }
  };

  const signout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Signout Error:', error);
      // You might want to provide user feedback here
      throw error;
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
