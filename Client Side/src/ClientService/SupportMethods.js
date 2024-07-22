import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '../Common/Constants';
import * as Application from 'react-native-device-info';

// #region Authentication Methods
  export async function userParams(emailAddress, password) {
    const userParams = {
      username: emailAddress,
      password: password,
      deviceInfo: await getDeviceInformation(emailAddress)
    };
    return userParams;
  }

  export async function macParam() {
    const macParams = {macAddress : await getDeviceMacAddress()}
    return macParams
  }

  export async function tokenParam() {
    const tokenParams = {jsonToken : await AsyncStorage.getItem(Platform.OS === Constants.Devices.IOS ? await Application.syncUniqueId() : await Application.getAndroidId())}
    return tokenParams
  }

  export async function userToken() {
    const token = await AsyncStorage.getItem(Platform.OS === Constants.Devices.IOS ? await Application.syncUniqueId() : await Application.getAndroidId())
    return token;
  }

  export async function getDeviceInformation(emailAddress) {
    const deviceInfo = {
      Username: await emailAddress.split('@')[0],
      macAddress: await getDeviceMacAddress(),
      operatingSystem: await getDeviceOS(),
      deviceName: await getDeviceName(),
      lastAccessedLocation: await getLastAccessedLocation()
    }
    return deviceInfo
  }
 
  export async function getDeviceMacAddress() {
    const macAddress = Platform.OS === Constants.Devices.IOS ? await Application.syncUniqueId() : await Application.getAndroidId();
    return macAddress;
  }

  export async function getDeviceOS() {
    const deviceOS = Platform.OS === Constants.Devices.IOS ? 'iOS ' + Application.getSystemVersion() : 'Android ' + Application.getSystemVersion();
    return deviceOS;
  }

  export async function getDeviceName() {
    const deviceName = Platform.OS === Constants.Devices.Android ? (Application.getDeviceName() === null ?  Application.getModel() : await Application.getDeviceName())
    : Platform.OS === Constants.Devices.IOS ? (Application.getDeviceName() === null ?  Application.getModel() : await Application.getDeviceName())
    : 'Unknown Platform';
    return deviceName;
  }

  export async function getLastAccessedLocation() {
    const deviceLocation = 'NULL'
    return deviceLocation;
  }

  export async function userInformation(accessToken, macAddress, UserID) {
    const requestData = {
      accessToken: accessToken,
      macAddress: macAddress,
      UserLoginID: UserID,
      Platform: Platform.OS
    }
    return requestData
  };
  // #endregion

// #region Reporting Methods

  // #region Pulse

    export async function pulseParams(country, feed, center, hour, Skill_Name) {
        const PulseRequestData = {
          Location: country,
          Duration: feed,
          View: center,
          Hour: feed === true ? hour : 23,
          Skillname: Skill_Name || 'OVERALL',
          Token: await userToken()
        };
        return PulseRequestData;
      }


  // #endregion

  // #region Finance
    export async function invoiceParams(startDate, endDate) {
      const invoiceRequestData = {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };
      return invoiceRequestData;
    }
    
    export async function previousInvoiceParams(StartDate, endDate, DealersName, Status) {
      const invoiceRequestData = {
        startDate: StartDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dealer: DealersName,
        type: Status
      };
      return invoiceRequestData;
    }

  // #endregion

// #endregion