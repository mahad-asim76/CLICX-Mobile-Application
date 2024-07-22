import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingSecondaryOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgb(255, 255, 255)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:1
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
      paddingVertical: 15,
      alignItems: 'center',
      borderBottomLeftRadius: 150,
      borderBottomRightRadius: 150, 
    },
    welcomeText: {
      fontSize: 23,
      color: '#fff',
      fontFamily: 'Poppins-Bold'
    },
    welcomeUser: {
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Poppins-Regular'
    },
    contactUser: {
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
      fontFamily: 'Poppins-Regular'
    },
    touchablesContainer: {
      flex:1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    iconTouchable: {
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical: 40,
      borderRadius: 10,
      width: '100%',
      marginTop: 20,
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
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    IconImageStyle:{
      width: 50,
      height: 50
    },
    iconText: {
      fontSize: 30,
      paddingLeft: 20,
      paddingTop: 5,
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
    imageStyle:{
      flex:1, justifyContent: 'center', alignItems: 'center'
    }
  });

  export default styles;