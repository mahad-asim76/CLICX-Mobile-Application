import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ClicxMethods from '../../ClientService/SupportMethods';
import * as Constants from '../../Common/Constants';
import LZString from 'lz-string'
import ServiceClient from '../../ClientService/ClientAPI';
import styles from '../../../Themes/Default Theme/Common/FooterStyles.js';
import * as svgIcon from '../../../Themes/SVG Icons/svgFooterComponent.js';
import * as svgICON from '../../../Themes/SVG Icons/svgCommonComponent.js';
import * as SvgIcon from '../../../Themes/SVG Icons/svgPulseComponent.js';

const AppFooter = ({ isDefault, dashboardfocus, policyfocused, termsfocused, handlePrivacyPolicy, handleTerms, versioning, handleVersioning}) => {
  const navigation = useNavigation();
  const [dashboardFocus, setdashboardFocus] = useState(dashboardfocus);
  const [policyFocused, setPolicyFocused] = useState(policyfocused);
  const [termsFocused, setTermsFocused] = useState(termsfocused);
  const [versionFocused, setVersionFocused] = useState(versioning);
  const [itemColor, setItemColor] = useState({ color: '#ffffff', text: '#ffffff'});
  const serviceClient = new ServiceClient();
  const Year = new Date().getFullYear();
  
  const handlePrivacyPolicyPress = () => {
    handlePrivacyPolicy(true);
    setPolicyFocused(true);
    setdashboardFocus(false);
    setTermsFocused(false);
    handleVersioning(false);
    setVersionFocused(false);
  };

  const handleTermsOfUsePress = () => {
    handleTerms(true);
    setPolicyFocused(false);
    setTermsFocused(true);
    setdashboardFocus(false);
    handleVersioning(false);
    setVersionFocused(false);
  };

  const handleVersioningPress = () => {
    handleTerms(false);
    setPolicyFocused(false);
    setTermsFocused(false);
    setdashboardFocus(false);
    handleVersioning(true);
    setVersionFocused(true);
  };

  const navigateToLoginScreen = async () => {
    setdashboardFocus(false);
    handlePrivacyPolicy(false); 
    handleVersioning(false);  
    setPolicyFocused(false);
    setTermsFocused(false);
    handleTerms(false);
    setVersionFocused(false);
    setItemColor({ color: '#fcbd39', text: '#fcbd39' });
    Alert.alert(
      '',
      'Do you want to Exit?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            const response = await serviceClient.getDataAsync(Constants.Authentication, Constants.UpdateSession, await ClicxMethods.tokenParam())
            const ResponseData = JSON.parse(LZString.decompressFromBase64(response))
            if (ResponseData.valid) {
              Alert.alert('', 'Session has been Terminated', [{ text: 'OK' }], { cancelable: false });
              navigation.navigate(Constants.LoginScreen);
              setItemColor({ color: '#ffffff', text: '#ffffff' });
            }
          },
        },
        {
          text: 'No',
          onPress: () => {
            setItemColor({ color: '#ffffff', text: '#ffffff' });
            setdashboardFocus(true);
          },
        },    
      ],
      { cancelable: false }
    )};
  
  const navigateToDashboardScreen = () => {
    setdashboardFocus(true);
    handlePrivacyPolicy(false);  
    handleVersioning(false); 
    setPolicyFocused(false);
    setTermsFocused(false);
    handleTerms(false);
    setVersionFocused(false);
  };
  
  return (
    <View style={isDefault ? styles.simpleFooter : styles.footer}>
      {isDefault ? (
         <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 20}}>
          {svgICON.SvgCopyRight({ width: styles.copyRightStyle.width, height: styles.copyRightStyle.height, color: "grey" })}
          <Text style={styles.fontStyle}> {Year} ibex.digital</Text>
        </View>
      ) : (
        <>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={navigateToDashboardScreen}
              disabled={dashboardFocus === true}>
              {dashboardFocus? (svgIcon.SvgDashboard_Active({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height})):
              (svgIcon.SvgDashboard({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height}))}
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handlePrivacyPolicyPress}
              disabled={policyFocused === true}>
              {policyFocused? (svgIcon.SvgPolicy_Active({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height})):
              (svgIcon.SvgPolicy({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height}))}
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleTermsOfUsePress}
              disabled={termsFocused === true}>
              {termsFocused? (svgIcon.SvgTerms_Active({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height})):
              (svgIcon.SvgTerms({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height}))}
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleVersioningPress}
             disabled={versionFocused === true}>
             {versionFocused ? (SvgIcon.SvgExclamation_Active({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height})):
              (SvgIcon.SvgExclamation_InActive({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height}))}
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={navigateToLoginScreen}>
            {svgIcon.SvgLogout({width: styles.scrollableSVG.width, height: styles.scrollableSVG.height, color: itemColor.color})}
            </TouchableOpacity>
          </View>        
        </>      
      )}
    </View>
  );
};

export default AppFooter;
