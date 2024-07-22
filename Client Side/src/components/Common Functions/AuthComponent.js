import { Alert, } from 'react-native';
import * as ClicxMethods from '../../ClientService/SupportMethods';
import ServiceClient from '../../ClientService/ClientAPI';
import * as Constants from '../../Common/Constants';
import LZString from 'lz-string'

export const checkAuthToken = async (navigation, setIsLoggedIn, setHasDeactivated) => {
    const serviceClient = new ServiceClient();
    try {
        const ResponseData = await serviceClient.getDataAsync(Constants.Authentication, Constants.VerifyMacAddress, await ClicxMethods.tokenParam())
        if (ResponseData.authorize) {
            setIsLoggedIn(true);
            setHasDeactivated(false);
        } else {
            Alert.alert(
                'Session has been Expired',
                'Kindly Login Again',
                [
                {
                    text: 'OK',
                    onPress: async () => {
                    navigation.navigate(Constants.LoginScreen);
                    const response = await serviceClient.getDataAsync(Constants.Authentication, Constants.UpdateSession, await ClicxMethods.macParam())
                    const ResponseData = JSON.parse(LZString.decompressFromBase64(response))     
                    if (ResponseData.valid) {
                    Alert.alert('', 'Session has been Terminated', [{ text: 'OK' }], {
                        cancelable: false,
                        });                          
                    }
                    },
                },
                ],
                { cancelable: false }
            );
            setHasDeactivated(true);
            setIsLoggedIn(false);
        }
    } catch (error) {
        console.error(error);
    }
};

