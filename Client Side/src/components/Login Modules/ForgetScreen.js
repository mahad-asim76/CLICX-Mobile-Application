import React, {useState, useEffect} from 'react';
import {View, Dimensions,TouchableHighlight, Image, TextInput, Text, Keyboard, Platform, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import styles from '../../../Themes/Default Theme/Common/LoginStyles.js';
import transparentLoadingGif from '../../../assets/loading_animation.gif';
import Config from '../../../app.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as svgIcon from '../../../Themes/SVG Icons/svgCommonComponent.js';
import * as SvgIcon from '../../../Themes/SVG Icons/svgLoginComponent.js'
import AppFooter from '../Common Functions/AppFooter.js';

const ForgetScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordNewVisible, setPasswordNewVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailPasswordError, setEmailPasswordError] = useState('');
    const [usernameExists, setUsernameExists] = useState(false);

    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const showNewPassword = () => {
      setPasswordNewVisible(true);
    };

    const hideNewPassword = () => {
      setPasswordNewVisible(false);
    };

    const toggleNewPasswordVisibility = () => {
      if (passwordNewVisible) {
        hideNewPassword();
      } else {
        showNewPassword();
      }
    };

    const handlePress = () => {
      navigation.goBack();
    };

    const showConfirmPassword = () => {
      setPasswordConfirmVisible(true);
    };

    const hideConfirmPassword = () => {
      setPasswordConfirmVisible(false);
    };
    
    const toggleConfirmPasswordVisibility = () => {
      if (passwordConfirmVisible) {
        hideConfirmPassword();
      } else {
        showConfirmPassword();
      }
    };
    
    useFocusEffect(
      React.useCallback(() => {
        setEmailAddress('');
        setPasswordNew(''); 
        setEmailError('');
        setPasswordError('');
        setEmailPasswordError('');
        setUsernameExists(false);
        setIsLoggedIn(false);
      }, [])
    );

    const isPasswordValid = (password) => {
      const minLength = 8;
      const maxLength = 20;
      const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+,\./:;<=>?@[\\\]^_`{|}~-]+$/;
      return password.length >= minLength && password.length <= maxLength && passwordRegex.test(password);
    }; 

    const handleLogin = async () => {
      Keyboard.dismiss();
      hideNewPassword();
      hideConfirmPassword();
      setEmailError('');
      setPasswordError('');
      setEmailPasswordError('');
    
      if (emailAddress.trim() === '' || password.trim() === ''){
        setEmailPasswordError('Email and Password are Required.');
      } 
      else if (!isEmailValid(emailAddress)){
        setEmailError('Invalid Email Address.');
      } 
      else if (!isPasswordValid(password)) {
        setPasswordError('Password must be At Least 8 Characters Long.');
      } 
      else if (!isPasswordValid(password)) {
        setPasswordError('Password should not exceed 20 Characters.');
      } 
      else 
      {
        setIsLoading(true);     
        const deviceInfo = {
          Username: emailAddress.split('@')[0],
          macAddress: Platform.OS === 'ios' ? await Application.getIosIdForVendorAsync() : Application.androidId,
          operatingSystem: Platform.OS === 'ios' ? 'iOS '+ Device.osVersion : 'Android ' + Device.osVersion,
          deviceName: Platform.OS === 'android' ? Device.deviceName === null ? Device.designName : Device.deviceName
          : Platform.OS === 'ios' ? Device.deviceName === 'iPhone' ? Device.modelName : Device.deviceName
          : 'Unknown Platform',
          lastAccessedLocation: 'NULL'
        }
        
        await axios.post(Config.ProdURLRest+'Authentication', {
          username: emailAddress,
          password: password,
          deviceInfo: deviceInfo
        })
        .then(response => {
          if (response.data.authentication) {
            const username = deviceInfo.Username;
            AsyncStorage.setItem('Username', username)
            writeAccessTokenToFile(response.data.access_token)
            setIsLoggedIn(true);
            navigation.navigate('mainDashboard');
            setIsLoading(false);  
          } 
          else {
            setEmailError('Invalid Credentials.');
            setIsLoading(false);  
          }
        })
        .catch(error =>  {
          console.error('Error:', error.message);
        })
        .finally(() => {
          setIsLoggedIn(false);
          setIsLoading(false);  
        });
      }
    };
    return (
      <>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Image source={transparentLoadingGif} style={styles.loadingGif} />
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <TouchableHighlight onPress={handlePress} style={styles.backContainer} underlayColor='transparent'>
            {SvgIcon.SvgBack({width: styles.backContainer.width, height: styles.backContainer.height})}
          </TouchableHighlight>
          <View style={styles.imageContainer}>
            {svgIcon.SvgGreyLogoComponent({width: styles.headerImage.width, height: styles.headerImage.height})}
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="New Password"
              value={passwordNew}
              onChangeText={(text) => {
                setPasswordNew(text);
                setPasswordError('');
              } }
              style={[styles.textInput, passwordError !== '' && styles.errorInput]}
              secureTextEntry={!passwordNewVisible}
              underlineColorAndroid="transparent"
              error={passwordError !== ''} />
            <TouchableOpacity
              onPress={toggleNewPasswordVisibility}
              style={styles.eyeIcon}>
              {passwordNewVisible ? (SvgIcon.SvgEyeView({width: styles.eyeStyle.width, height: styles.eyeStyle.height}))
              :(SvgIcon.SvgEyeHide({width: styles.eyeStyle.width, height: styles.eyeStyle.height}))}
            </TouchableOpacity>
          </View>  
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChangeText={(text) => {
                setPasswordConfirm(text);
                setPasswordError('');
              } }
              style={[styles.textInput, passwordError !== '' && styles.errorInput]}
              secureTextEntry={!passwordConfirmVisible}
              underlineColorAndroid="transparent"
              error={passwordError !== ''} />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              style={styles.eyeIcon}>
              {passwordConfirmVisible ? (SvgIcon.SvgEyeView({width: styles.eyeStyle.width, height: styles.eyeStyle.height}))
              :(SvgIcon.SvgEyeHide({width: styles.eyeStyle.width, height: styles.eyeStyle.height}))}
            </TouchableOpacity>
          </View>
          {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
          {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
          {emailPasswordError !== '' && <Text style={styles.errorText}>{emailPasswordError}</Text>}
          <Button mode="contained"
            style={styles.button}
            disabled={isLoading}
          >
            <Text style={styles.buttontxt}>{'Reset'}</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
      <AppFooter
        isDefault={true}
        dashboardFocus={false}
        policyFocused={false}
        termsFocused={false}
        logoutFocused={false} 
      />
      </>

    );
  };

  export default ForgetScreen;