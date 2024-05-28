import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/components/HomeScreen/AppNavigation';
import GlobalBackHandler from './src/components/Common Functions/GlobalBackHandler';
import { useFonts } from 'expo-font';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular':require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium':require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold':require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold':require('./assets/fonts/Poppins-Bold.ttf'),
    'Inter-Regular':require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium':require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold':require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold':require('./assets/fonts/Inter-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <GlobalBackHandler>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </GlobalBackHandler>
  );
  
};

export default App;
  
