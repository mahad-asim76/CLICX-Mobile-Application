import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

const GlobalBackHandler = ({ children }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => backHandler.remove();
  }, []);
  return <>{children}</>;
};

export default GlobalBackHandler;
