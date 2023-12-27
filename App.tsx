import React, {useEffect} from 'react';
import Index from './src/navigation/Index';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store'; // Update the path to your store configuration
import {GoogleSignin} from '@react-native-community/google-signin';

const store = configureStore();

export default function App() {
  useEffect(() => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId:
        '356905384961-jbvm7j92m02ql84o4mpabuuq8s9a22qe.apps.googleusercontent.com',
    });
  }, []);
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
