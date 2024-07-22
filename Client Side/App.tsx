import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/components/HomeScreen/AppNavigation';
import GlobalBackHandler from './src/components/Common Functions/GlobalBackHandler';
import { enableScreens } from 'react-native-screens';

const App = () => {
 
  return (
    <GlobalBackHandler>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </GlobalBackHandler>
  );
};
enableScreens();
export default App;
