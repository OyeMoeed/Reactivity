import React from 'react';
import Index from './src/navigation/Index';
import {Provider} from 'react-redux';
import store from './src/redux/store/index';
export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
