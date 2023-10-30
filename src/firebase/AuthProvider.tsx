import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  const login = async ({email, password}) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert('Sign In Unsuccessful: ' + e.message);
    }
  };

  const register = async ({email, password}) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
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
        register,
        signout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
