import { Dimensions, StyleSheet } from 'react-native'
import Responsive from '../../../src/components/Common Functions/Responsive';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:1
    },
    loadingGif: {
      width: 70,
      height: 70,
    },
    welcomeContainer: {
      backgroundColor: '#152E57',
      paddingVertical: Responsive.pixelSizeVertical(15),
      alignItems: 'center',
      borderBottomLeftRadius: 150,
      borderBottomRightRadius: 150, 
    },
    welcomeText: {
      fontSize: Responsive.fontPixel(23),
      color: '#fff',
      fontFamily: 'Poppins-Bold'
    },
    welcomeUser: {
      fontSize: Responsive.fontPixel(20),
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Poppins-Regular'
    },
    touchablesContainer: {
      flex:1,
      paddingHorizontal: Responsive.pixelSizeHorizontal(20),
      paddingBottom: Responsive.pixelSizeVertical(20),
    },
    iconTouchable: {
      alignItems: 'center',
      paddingHorizontal: Responsive.pixelSizeHorizontal(40),
      paddingVertical: Responsive.pixelSizeHorizontal(40),
      borderRadius: 10,
      width: '100%',
      marginTop: Responsive.pixelSizeVertical(20),
      flexDirection: 'row',
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOpacity: 0.6,
          shadowRadius: 5,
          shadowOffset: { width: 1, height: 5 },
        },
        android: {
          elevation: 2,
          shadowColor: 'grey',
          shadowOpacity: 0.6,
          shadowRadius: 5,
          shadowOffset: { width: 1, height: 5 },
        },
      }),
    },
    pulsebg: {
      backgroundColor: '#8FCFEF',
    },
    financesbg: {
      backgroundColor: '#A9D88B',
    },
    swboardbg: {
      backgroundColor: '#FFBF39',
    },
    workbenchbg: {
      backgroundColor: '#AA80CE',
    },
    loadingContainer: {
      marginTop: Responsive.pixelSizeVertical(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    IconImageStyle:{
      width: Responsive.widthPixel(50),
      height: Responsive.heightPixel(50)
    },
    iconText: {
      fontSize: Responsive.fontPixel(30),
      paddingLeft: Responsive.pixelSizeHorizontal(20),
      paddingTop: Responsive.pixelSizeVertical(5),
      color: '#fff',
      fontFamily: 'Poppins-Regular'
    },
    iconTouchablePressed: {
      backgroundColor: 'lightgrey',
    },
    DashboardImageStyle:{
      width: Dimensions.get('screen').width*0.8,
      height: Dimensions.get('screen').height*0.3
    },
  });

  export default styles;