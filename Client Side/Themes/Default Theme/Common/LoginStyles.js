import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor:'white',
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(211, 211, 211, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    loadingGif: {
      width: 70,
      height: 70,
    },
    imageContainer:{
      alignItems:'center',
      paddingBottom: 80,
    },
    textInput: {
      marginBottom: 15,
      backgroundColor:'transparent',
      borderWidth: 1,
      borderColor: '#C2C1C1',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 15,
      color: '#696E7B',
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
    },
    plfont: {
      fontFamily: 'Poppins-Regular',
    },
    headerImage:{
      width: 213,
      height: 56,
    },
    button: {
      marginTop: 10,
      backgroundColor:'#152E57',
      fontWeight: 500,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    buttontxt: {
      fontSize: 16,
      paddingVertical: 5,
      fontFamily: 'Poppins-Regular',
    },
    forgetContainer:{
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgetText:{
      textDecorationLine: 'underline',
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      color: '#696E7B'
    },
    loadingContainer: {
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    passwordContainer: {
      position: 'relative',
    },
    eyeIcon: {
      padding: 15,
      position: 'absolute',
      right: 0,
    },
    eyeStyle:{
      width: 25,
      height: 25,
    },
    errorText:{
      color: '#fb0000',
      fontFamily:'Poppins-Bold',
      paddingHorizontal: 5
    },
    focusedInput:{
      borderWidth: 2,
    },
    backContainer:{
      position: 'absolute',
      padding: 10,
      top: 10,
      width: 25,
      height: 25,
    },
  });

  export default styles;