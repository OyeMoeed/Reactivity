import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert('Incorrect Email Id or Password');
    }
  };

  const signup = async (email, password) => {
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
        signup,
        signout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
