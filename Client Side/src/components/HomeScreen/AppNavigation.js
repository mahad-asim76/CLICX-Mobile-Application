import {useState, useEffect}from 'react';
import { Alert, Platform, View, TouchableOpacity} from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import * as ClicxMethods from '../../ClientService/SupportMethods';
import { useNavigation } from '@react-navigation/native';
import ServiceClient from '../../ClientService/ClientAPI.js';
import LoginScreen from '../Login Modules/LoginScreen.js';
import MainDashboard from './MainDashboard.js';
import * as Constants from '../../Common/Constants.js'
import pulseScreen from '../Reporting/Pulse/MainScreen.js';
import DealerInvoice from '../Reporting/Finance/Dealer Commissions/DealerInvoice.js';
import dealerScreen from '../Reporting/Finance/Dealer Commissions/MainScreen.js';
import analyticsScreen from '../Reporting/Finance/Dealer Commissions/Analytics.js';
import ForgetScreen from '../Login Modules/ForgetScreen.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgWhiteLogoComponent } from '../../../Themes/SVG Icons/svgCommonComponent.js';
import styles from '../../../Themes/Default Theme/Common/AppNavigationStyles.js';
import * as Application from 'expo-application';
import SplashScreen from '../Common Functions/SplashScreen.js';
import * as svgIcon from '../../../Themes/SVG Icons/svgFooterComponent.js';
import * as SvgIcon from '../../../Themes/SVG Icons/svgPulseComponent.js';
import LZString from 'lz-string'

const AppNavigation = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const [routeName, setRouteName] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [itemColor, setItemColor] = useState({ color: '#ffffff', text: '#ffffff'});
  const [quitConfirmed, setQuitConfirmed] = useState(false);
  const serviceClient = new ServiceClient();
  
  useEffect(() => {
    const authCheck = async () => {
      if (!quitConfirmed) { 
        try {
          if(await ClicxMethods.userToken() == null){
            setRouteName('Login');
            setQuitConfirmed(true);
            setHasNavigated(false);
          }
          else {
            const ResponseData = await serviceClient.getDataAsync(Constants.Authentication, Constants.VerifyMacAddress, await ClicxMethods.tokenParam())
            if (ResponseData.status == 200 && !hasNavigated) {
              if (ResponseData.authorize && ResponseData.userID != "") {
                setIsLoggedIn(true);
                setRouteName(Constants.DashboardScreen);
                navigation.navigate(Constants.DashboardScreen);
                setHasNavigated(true);
              } else {
                navigation.navigate(Constants.LoginScreen);
                Alert.alert(
                  'Session has been Expired',
                  'Kindly Login Again',
                  [
                    {
                      text: 'OK',
                      onPress: async () => {
                        const response = await serviceClient.getDataAsync(Constants.Authentication, Constants.UpdateSession, await ClicxMethods.macParam())
                        const ResponseData = JSON.parse(LZString.decompressFromBase64(response))
                        if (ResponseData.valid) {
                          setRouteName('Login');
                          setQuitConfirmed(true);
                          setHasNavigated(false);
                        }
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setShowSplash(false);
          setQuitConfirmed(true);
        }
      }
    };
    authCheck();
  }, [navigation, hasNavigated, quitConfirmed]);
  
  const navigateToDashboardScreen = () => {
    navigation.navigate(Constants.DashboardScreen);
  };

  const navigateToInvoiceScreen = () => {
    navigation.navigate(Constants.DealerCommissionsScreen);
  };

  const navigateToLoginScreen = async () => {
    setItemColor({ color: '#fcbd39', text: '#fcbd39' });
    Alert.alert(
      'Do you want to Exit?',
      'Kindly Login Again',
      [
        {
          text: 'Yes',
          onPress: async () => {
            const response = await serviceClient.getDataAsync(Constants.Authentication, Constants.UpdateSession, await ClicxMethods.tokenParam());
            const ResponseData = JSON.parse(LZString.decompressFromBase64(response))
            if (ResponseData.valid) {
              Alert.alert('', 'Session has been Terminated', [{ text: 'OK' }], { cancelable: false });
              navigation.navigate('Login');
              setItemColor({ color: '#ffffff', text: '#ffffff' });
            }
          },
        },
        {
          text: 'No',
          onPress: () => {
            setItemColor({ color: '#ffffff', text: '#ffffff' });
          },
        },    
      ],
      { cancelable: false }
    )};

  return (
    <SafeAreaView style={{ flex: 1 }}>
    {showSplash ? (
      <SplashScreen />
      ) : (
      <>
        <StatusBar backgroundColor={styles.statusBar.backgroundColor} barStyle="light-content" translucent={true} />
        <Stack.Navigator initialRouteName={routeName}
          screenOptions={{
            headerLeft: null,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <Stack.Screen
            name={Constants.LoginScreen}
            component={LoginScreen}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name={Constants.ForgetScreen}
            component={ForgetScreen}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name={Constants.DashboardScreen}
            component={MainDashboard}
            options={{
              headerTitle: () => (
                <SvgWhiteLogoComponent width={styles.headerImage.width} height={styles.headerImage.height} />
              ),
              headerRight: null,
              headerLeft: null,
              headerStyle: {
                backgroundColor: styles.headerTitleImage.backgroundColor,
                borderBottomWidth: styles.headerTitleImage.borderBottomWidth,
                elevation: styles.headerTitleImage.elevation,
                height: styles.headerTitleImage.height
              },
              headerStatusBarStyle: styles.headerTitleImage.headerStatusBarStyle,
            }} />
          <Stack.Screen
            name={Constants.PulseScreen}
            component={pulseScreen}
            options={{
              headerTitle: () => (
                <SvgWhiteLogoComponent width={styles.headerImage.width} height={styles.headerImage.height} />
              ),
              headerRight: () => (
              <View style={styles.footerContainer}>
                <TouchableOpacity onPress={navigateToLoginScreen}>
                  {svgIcon.SvgLogout({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
                </TouchableOpacity>
              </View>
              ),
              headerLeft: () => (
                <View style={styles.footerContainer}>
                  <TouchableOpacity onPress={navigateToDashboardScreen}>
                    {svgIcon.SvgHome({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height})}
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: styles.headerTitleImage.backgroundColor,
                borderBottomWidth: styles.headerTitleImage.borderBottomWidth,
                elevation: styles.headerTitleImage.elevation,
                height: styles.headerTitleImage.height
              },
              headerStatusBarStyle: styles.headerTitleImage.headerStatusBarStyle,
            }} />
          <Stack.Screen
            name={Constants.DealerCommissionsScreen}
            component={dealerScreen}
            options={{
              headerTitle: () => (
                <SvgWhiteLogoComponent width={styles.headerImage.width} height={styles.headerImage.height} />
              ),
              headerRight: () => (
              <View style={styles.footerContainer}>
                <TouchableOpacity onPress={navigateToLoginScreen}>
                  {svgIcon.SvgLogout({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
                </TouchableOpacity>
              </View>
              ),
              headerLeft: () => (
                <View style={styles.footerContainer}>
                  <TouchableOpacity onPress={navigateToDashboardScreen}>
                    {svgIcon.SvgHome({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height})}
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: styles.headerTitleImage.backgroundColor,
                borderBottomWidth: styles.headerTitleImage.borderBottomWidth,
                elevation: styles.headerTitleImage.elevation,
                height: styles.headerTitleImage.height
              },
              headerStatusBarStyle: styles.headerTitleImage.headerStatusBarStyle,
            }} />
          <Stack.Screen
            name={Constants.InvoiceScreen}
            component={DealerInvoice}
            options={{
              headerTitle: () => (
                <SvgWhiteLogoComponent width={styles.headerImage.width} height={styles.headerImage.height} />
              ),
              headerRight: () => (
              <View style={styles.footerContainer}>

                <TouchableOpacity onPress={navigateToLoginScreen}>
                  {svgIcon.SvgLogout({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
                </TouchableOpacity>
              </View>
              ),
              headerLeft: () => (
                <View style={styles.footerContainer}>
                  <TouchableOpacity onPress={navigateToInvoiceScreen} style={styles.leftArrowStyle}>
                    {SvgIcon.SvgLeftArrow({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: styles.headerTitleImage.backgroundColor,
                borderBottomWidth: styles.headerTitleImage.borderBottomWidth,
                elevation: styles.headerTitleImage.elevation,
                height: styles.headerTitleImage.height
              },
              headerStatusBarStyle: styles.headerTitleImage.headerStatusBarStyle,
            }} />
          <Stack.Screen
            name={Constants.AnalyticsScreen}
            component={analyticsScreen}
            options={{
              headerTitle: () => (
                <SvgWhiteLogoComponent width={styles.headerImage.width} height={styles.headerImage.height} />
              ),
              headerRight: () => (
              <View style={styles.footerContainer}>
                <TouchableOpacity onPress={navigateToLoginScreen}>
                  {svgIcon.SvgLogout({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
                </TouchableOpacity>
              </View>
              ),
              headerLeft: () => (
                <View style={styles.footerContainer}>
                  <TouchableOpacity onPress={navigateToInvoiceScreen} style={styles.leftArrowStyle}>
                    {SvgIcon.SvgLeftArrow({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: styles.headerTitleImage.backgroundColor,
                borderBottomWidth: styles.headerTitleImage.borderBottomWidth,
                elevation: styles.headerTitleImage.elevation,
                height: styles.headerTitleImage.height
              },
              headerStatusBarStyle: styles.headerTitleImage.headerStatusBarStyle,
            }} />
        </Stack.Navigator>
      </>
    )}
    </SafeAreaView>
    );
};

export default AppNavigation;
