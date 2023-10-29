import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password); // Corrected parameters
          } catch (e) {
            alert('Sign In Unsuccessful');
          }
        },
        register: async (name, email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password); // Corrected parameters
          } catch (e) {
            alert('Sign Up Unsuccessful');
          }
        },
        signout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            alert('Signout Unsuccessful');
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
