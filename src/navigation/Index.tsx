import React from 'react';
import {AuthProvider} from '../firebase/AuthProvider';
import Routes from './Routex';

const Index = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Index;
