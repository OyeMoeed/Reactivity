import React from 'react';
import Index from './src/navigation/Index';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store'; // Update the path to your store configuration

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
