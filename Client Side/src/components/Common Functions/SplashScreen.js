import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Constants from '../../Common/Constants';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/clicx-splash-screen.gif')} style={styles.gif} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  gif: {
    width: '70%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
