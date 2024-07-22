import React, {useState} from 'react';
import {View, Image, TextInput, Text, Keyboard, Platform, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import {Button} from 'react-native-paper';
import * as ClicxMethods from '../../ClientService/SupportMethods';
import styles from '../../../Themes/Default Theme/Common/LoginStyles.js';
import transparentLoadingGif from '../../../assets/loading_animation.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as svgIcon from '../../../Themes/SVG Icons/svgCommonComponent.js';
import * as SvgIcon from '../../../Themes/SVG Icons/svgLoginComponent.js'
import * as Constants from '../../Common/Constants.js';
import AppFooter from '../../components/Common Functions/AppFooter.js';
import LZString from 'lz-string'
import ServiceClient from '../../ClientService/ClientAPI.js';


const LoginScreen = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [exceptionError, setExceptionError] = useState('');
    const [emailPasswordError, setEmailPasswordError] = useState('');
    const [usernameExists, setUsernameExists] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const serviceClient = new ServiceClient();
    
    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    const handleFocus = () => {
      setIsPasswordFocused(true);
      setIsEmailFocused(false);
      setEmailError('');
      setPasswordError('');
      setEmailPasswordError('');
    };

    const handleEmailFocus = () => {
      setIsEmailFocused(true);
      setIsPasswordFocused(false);
      setEmailError('');
      setPasswordError('');
      setEmailPasswordError('');
    };

    const showPassword = () => {
      setPasswordVisible(true);
    };
    
    const hidePassword = () => {
      setPasswordVisible(false);
    };
    
    const togglePasswordVisibility = () => {
      if (passwordVisible) {
        hidePassword();
      } else {
        showPassword();
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        setEmailAddress('');
        setPassword(''); 
        setEmailError('');
        setPasswordError('');
        setEmailPasswordError('');
        setUsernameExists(false);
        setIsLoggedIn(false);
      }, [])
    );

    const navigateToForgetScreen = () => {
      navigation.navigate(Constants.ForgetScreen);
    };

    const isShortPasswordValid = (password) => {
      const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+,\./:;<=>?@[\\\]^_`{|}~-]+$/;
      return password.length >= 8 && passwordRegex.test(password);
    }; 

    const isLongPasswordValid = (password) => {
      const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+,\./:;<=>?@[\\\]^_`{|}~-]+$/;
      return password.length <= 20  && passwordRegex.test(password);
    }; 

    async function writeAccessTokenToFile(accessToken) {
      const filePath = `${FileSystem.documentDirectory}access_token.txt`;    
      try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);    
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(filePath);
        }
        await FileSystem.writeAsStringAsync(filePath, accessToken);
      } catch (error) {
        console.error(Constants.LoginError.ErrorWritingFile, error);
      }
    }
    
    async function setToken(requestdata, macAddress){
      AsyncStorage.getItem(macAddress)
        .then(existingData => {
          if (existingData !== null) {
            AsyncStorage.removeItem(macAddress)
              .then(() => {
                writeAccessTokenToFile(requestdata.accessToken.toString());
                AsyncStorage.setItem(macAddress, LZString.compressToBase64(JSON.stringify(requestdata)))
              })
              .catch(error => {
                console.error(Constants.LoginError.TokenRemovingError, error);
              });
          } else {
            writeAccessTokenToFile(requestdata.accessToken.toString());
            AsyncStorage.setItem(macAddress, LZString.compressToBase64(JSON.stringify(requestdata)))
          }
        })
        .catch(error => {
          console.error(Constants.LoginError.TokenCheckingError, error);
        });
    }

    async function setUserFeature(userFeaturesInfo, sessionID){
      AsyncStorage.getItem(sessionID)
        .then(existingData => {
          if (existingData !== null) {
            AsyncStorage.removeItem(sessionID)
              .then(() => {
                AsyncStorage.setItem(sessionID, JSON.stringify(userFeaturesInfo))
              })
              .catch(error => {
                console.error(Constants.LoginError.TokenRemovingError, error);
              });
          } else {
            AsyncStorage.setItem(sessionID, JSON.stringify(userFeaturesInfo))
          }
        })
        .catch(error => {
          console.error(Constants.LoginError.TokenCheckingError, error);
        });
    }


    const handleLogin = async () => {
      Keyboard.dismiss();
      hidePassword();
      setEmailError('');
      setPasswordError('');
      setExceptionError('');
      setEmailPasswordError('');
      setIsPasswordFocused(false);
      setIsEmailFocused(false);
      if (emailAddress.trim() === '' || password.trim() === ''){
        setEmailPasswordError(Constants.LoginError.EmailPasswordError);
      } 
      else if (!isEmailValid(emailAddress)){
        setEmailError(Constants.LoginError.EmailError);
      } 
      else if (!isShortPasswordValid(password)) {
        setPasswordError(Constants.LoginError.PasswordErrorShort);
      } 
      else if (!isLongPasswordValid(password)) {
        setPasswordError(Constants.LoginError.PasswordErrorLong);
      } 
      else 
      {
        setIsLoading(true);
        const userParams = await ClicxMethods.userParams(emailAddress, password)    
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await serviceClient.getDataAsync(Constants.Authentication, Constants.VerifyAuthentication, userParams)
        const ResponseData = JSON.parse(LZString.decompressFromBase64(response));
        try {
          if(ResponseData == null){
            setExceptionError(Constants.LoginError.ServerExceptionError);
          }
          else{
            if (ResponseData.valid) {
              setUserFeature(ResponseData.userinfo, Constants.SessionID)
              AsyncStorage.setItem(Constants.Username, userParams.deviceInfo.Username)
              const requestData = await ClicxMethods.userInformation(ResponseData.access_token, userParams.deviceInfo.macAddress, ResponseData.UserID)  
              setToken(requestData, userParams.deviceInfo.macAddress.toString());      
              setIsLoggedIn(true);
              navigation.navigate(Constants.DashboardScreen, {userFeatures: ResponseData.userinfo});
              setIsLoading(false);             
              
            } 
            else {
              setEmailError(ResponseData.message);
              setIsLoading(false);  
            }
          }
        }
        finally {
          setIsLoggedIn(true);
          setIsLoading(false);  
        };
      }
    };

    return (
      <>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Image source={transparentLoadingGif} style={styles.loadingGif}/>
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {svgIcon.SvgGreyLogoComponent({width: styles.headerImage.width, height: styles.headerImage.height})}
          </View>
          <TextInput
            style={[styles.textInput, 
              emailError !== '' && styles.errorInput,
              isEmailFocused && styles.focusedInput,
            ]}
            placeholder="Email"
            placeholderTextColor={styles.textInput.color}
            value={emailAddress}
            onChangeText={(text) => {
              setEmailAddress(text);
              setEmailError('');
            } }
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onFocus={handleEmailFocus}
            error={emailError !== ''} />   
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              } }
              style={[styles.textInput, 
                passwordError !== '' && styles.errorInput,
                isPasswordFocused && styles.focusedInput,
              ]}
              secureTextEntry={!passwordVisible}
              onFocus={handleFocus}
              placeholderTextColor={styles.textInput.color}
              underlineColorAndroid="transparent"
              error={passwordError !== ''} />
            <View style={styles.eyeIcon}>
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                >
                {passwordVisible ? (SvgIcon.SvgEyeView({width: styles.eyeStyle.width, height: styles.eyeStyle.height}))
                :(SvgIcon.SvgEyeHide({width: styles.eyeStyle.width, height: styles.eyeStyle.height}))}
              </TouchableOpacity>
            </View>
          </View>
          {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
          {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
          {exceptionError !== '' && <Text style={styles.errorText}>{exceptionError}</Text>}
          {emailPasswordError !== '' && <Text style={styles.errorText}>{emailPasswordError}</Text>}
          <Button mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={isLoading}
          >
            <Text style={styles.buttontxt}>{isLoading ? 'Logging In...' : 'Login'}</Text>
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

  export default LoginScreen;