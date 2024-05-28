import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight, Platform, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import transparentLoadingGif from '../../../assets/loading_animation.gif';
import styles from '../../../Themes/Default Theme/Common/DashboardStyles.js';
import AppFooter from '../Common Functions/AppFooter';
import * as Constants from '../../Common/Constants';
import * as SvgIcon from '../../../Themes/SVG Icons/svgCommonComponent.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

const MainDashboard = () => {
  const [pressedButton, setPressedButton] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyPolicyWebView, setShowPrivacyPolicyWebView] = useState(false);
  const [showTermsOfUseWebView, setShowTermsOfUseWebView] = useState(false);
  const [hasDeactivated, setHasDeactivated] = useState(false);
  const [Username, setUsername] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsLoading(false);
      setPressedButton(null);
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem(Constants.Username);
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error(Constants.DashboardError, error);
      }
    };
    fetchUsername();
  }, []);

  function capitalizeUsername(username) {
    const words = username.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  }

  const handlePress = (button) => {
    setIsLoading(true);
    setPressedButton(button);
    setTimeout(() => {
      if (button === 'pulse') {
        navigation.navigate('pulseMain');
      }
      else if(button=='dealer'){
        navigation.navigate('dealerCommissionMain');
      }
    }, 2000);
  };

  return (
    <>
      <View style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>       
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.welcomeUser}>Hi, {capitalizeUsername(Username)}</Text>
          </View>
          <View style={styles.touchablesContainer}>
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <Image source={transparentLoadingGif} style={styles.loadingGif} />
              </View>
            )}
            <TouchableHighlight
              style={[styles.iconTouchable, styles.pulsebg]}
              onPress={() => handlePress('pulse')}
              underlayColor="Transparent"
            >     
              <>
                {SvgIcon.SvgPulseLogo({width: styles.IconImageStyle.width, height: styles.IconImageStyle.height})}
                <Text style={styles.iconText}>Pulse</Text>
              </>  
            </TouchableHighlight>
            <TouchableHighlight 
              style={[styles.iconTouchable,  styles.financesbg]}
              onPress={() => handlePress('dealer')}
              underlayColor="Transparent"
            >
              <>
                {SvgIcon.SvgFinanceLogo({width: styles.IconImageStyle.width, height: styles.IconImageStyle.height})}
                <Text style={styles.iconText}>Finances</Text>
              </>  
            </TouchableHighlight>
            {/* <TouchableOpacity style={[styles.iconTouchable, styles.swboardbg]}>
              {SvgIcon.SvgSwitchboardLogo({width: styles.IconImageStyle.width, height: styles.IconImageStyle.height})}
              <Text style={styles.iconText}>Switchboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconTouchable,  styles.workbenchbg]}>
              {SvgIcon.SvgWorkBenchLogo({width: styles.IconImageStyle.width, height: styles.IconImageStyle.height})}
              <Text style={styles.iconText}>Workbench</Text>
            </TouchableOpacity> */}
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              {SvgIcon.SvgDashboardImage({width: styles.DashboardImageStyle.width, height: styles.DashboardImageStyle.height})}
            </View>
          </View>
        </View>
        <View style={showPrivacyPolicyWebView || showTermsOfUseWebView? {height: Dimensions.get("window").height} : ''}>
          {showPrivacyPolicyWebView && (
            <WebView
              source={{ uri: Constants.PolicyURL }}
              onLoadStart={() => setShowTermsOfUseWebView(false)} 
            />
          )}
          {showTermsOfUseWebView && (
            <WebView
              source={{ uri: Constants.TermsURL }}
              onLoadStart={() => setShowPrivacyPolicyWebView(false)}
            />
          )}
        </View>
      </View>
      <AppFooter dashboardfocus={true}
        policyfocused={false}
        termsfocused={false}
        handlePrivacyPolicy={setShowPrivacyPolicyWebView}
        handleTerms={setShowTermsOfUseWebView}
      />
    </>
  );
};

export default MainDashboard;
