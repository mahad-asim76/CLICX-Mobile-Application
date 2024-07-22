import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import transparentLoadingGif from '../../../assets/loading_animation.gif';
import styles from '../../../Themes/Default Theme/Common/DashboardStyles.js';
import AppFooter from '../Common Functions/AppFooter';
import * as Constants from '../../Common/Constants';
import * as SvgIcon from '../../../Themes/SVG Icons/svgCommonComponent.js';
import Drawer from '../Common Functions/Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersioningScreen from '../Common Functions/VersioningScreen';
import WebView from 'react-native-webview';

const MainDashboard = ({route}) => {
  const [pressedButton, setPressedButton] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyPolicyWebView, setShowPrivacyPolicyWebView] = useState(false);
  const [showTermsOfUseWebView, setShowTermsOfUseWebView] = useState(false);
  const [showVersioning, setShowVersioning] = useState(false);
  const [Username, setUsername] = useState('');
  const [userFeatures, setUserFeatures] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const data = route.params ? route.params.userFeatures : null;

  useEffect(() => {
    fetchData();
    if (!isFocused) {
      setIsLoading(false);
      setPressedButton(null);
    }
  }, [isFocused]);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const storedUsername = await AsyncStorage.getItem(Constants.Username);
      if (storedUsername) { setUsername(storedUsername); }
      const userFeatures = JSON.parse(await AsyncStorage.getItem(Constants.SessionID));
      if(data == null){
        if (userFeatures) {
          setUserFeatures(userFeatures.Features);
          setUserRole(userFeatures.User);
        }
      } else {
        setUserFeatures(data.Features);
        setUserRole(data.User);
      }
    } catch (error) {
      console.error(Constants.DashboardError, error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  function userFeature(FeatureName) {
    const feature = userFeatures.find(feature => feature.FeatureName === FeatureName);
    return feature ? true : false;
  }
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
      else if(button === 'dealer'){
        navigation.navigate('dealerCommissionMain');
      }
    }, 2000);
  };

  return (
    <>
      <View style={{flex:1}}>
        {showVersioning == true ? (
          <VersioningScreen/>
        ):(
          <>
          <View style={styles.container}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>{data == null ? 'Welcome Back!' : 'Welcome!'}</Text>
              <Text style={styles.welcomeUser}>Hi, {capitalizeUsername(Username)}</Text>
            </View>
            <View style={styles.touchablesContainer}>
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <Image source={transparentLoadingGif} style={styles.loadingGif}/>
                </View>
              )}
              {userFeature(Constants.AppFeatures.Pulse) && (
                <TouchableHighlight
                  style={[styles.iconTouchable, styles.pulsebg]}
                  onPress={() => handlePress('pulse')}
                  underlayColor="Transparent"
                >
                  <>
                    {SvgIcon.SvgPulseLogo({ width: styles.IconImageStyle.width, height: styles.IconImageStyle.height })}
                    <Text style={styles.iconText}>Pulse</Text>
                  </>
                </TouchableHighlight>
              )}
              {userFeature(Constants.AppFeatures.Finance.DealerCommissions) && (
                <TouchableHighlight
                  style={[styles.iconTouchable, styles.financesbg]}
                  onPress={() => handlePress('dealer')}
                  underlayColor="Transparent"
                >
                  <>
                    {SvgIcon.SvgFinanceLogo({ width: styles.IconImageStyle.width, height: styles.IconImageStyle.height })}
                    <Text style={styles.iconText}>Finances</Text>
                  </>
                </TouchableHighlight>
              )}
              {!userFeature(Constants.AppFeatures.Pulse) && !userFeature(Constants.AppFeatures.Finance.DealerCommissions) ? (
                <View style={styles.imageStyle}>
                  {userRole.RoleName === Constants.TestRole ? (
                    <Text style={styles.contactUser}>No Record Found.</Text>
                  ) : (
                    <Text style={styles.contactUser}>Kindly Contact BD Support for Rights.</Text>
                  )}
                </View>
              ) : null}
              {/* <TouchableOpacity style={[styles.iconTouchable, styles.swboardbg]}>
                {SvgIcon.SvgSwitchboardLogo({width: styles.IconImageStyle.width, height: styles.IconImageStyle.height})}
                <Text style={styles.iconText}>Switchboard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconTouchable,  styles.workbenchbg]}>
                {SvgIcon.SvgWorkBenchLogo({width: styles.IconImageStyle.width, height: styles.IconImageStyle.height})}
                <Text style={styles.iconText}>Workbench</Text>
              </TouchableOpacity> */}
              <View style={styles.imageStyle}>
                {SvgIcon.SvgDashboardImage({ width: styles.DashboardImageStyle.width, height: styles.DashboardImageStyle.height })}
              </View>
            </View>
          </View>
          <View style={showPrivacyPolicyWebView || showTermsOfUseWebView || showVersioning ? { height: Dimensions.get("window").height } : ''}>
            {showPrivacyPolicyWebView && (
              <WebView
                source={{ uri: Constants.PolicyURL }}
                onLoadStart={() => setShowTermsOfUseWebView(false)} />
            )}
            {showTermsOfUseWebView && (
              <WebView
                source={{ uri: Constants.TermsURL }}
                onLoadStart={() => setShowPrivacyPolicyWebView(false)} />
            )}
          </View>
          </>
        )}    
      </View>
      <AppFooter dashboardfocus={true}
        policyfocused={false}
        termsfocused={false}
        handlePrivacyPolicy={setShowPrivacyPolicyWebView}
        handleTerms={setShowTermsOfUseWebView}
        versioning={false}
        handleVersioning={setShowVersioning}
      />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />

    </>

  );
};

export default MainDashboard;
