import { StyleSheet } from 'react-native'
import Responsive from '../../../src/components/Common Functions/Responsive';

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
      paddingBottom: Responsive.pixelSizeVertical(80),
    },
    textInput: {
      marginBottom: Responsive.pixelSizeVertical(15),
      backgroundColor:'transparent',
      borderWidth: 1,
      borderColor: '#C2C1C1',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingVertical: Responsive.pixelSizeVertical(15),
      paddingHorizontal: Responsive.pixelSizeHorizontal(15),
      color: '#696E7B',
      fontSize: Responsive.fontPixel(18),
      fontFamily: 'Poppins-SemiBold',
    },
    plfont: {
      fontFamily: 'Poppins-Regular',
    },
    headerImage:{
      width: Responsive.widthPixel(213),
      height: Responsive.heightPixel(56),
    },
    button: {
      marginTop: 10,
      backgroundColor:'#152E57',
      fontWeight: 500,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      paddingVertical: Responsive.pixelSizeVertical(5),
      paddingHorizontal: Responsive.pixelSizeHorizontal(10),
    },
    buttontxt: {
      fontSize: Responsive.fontPixel(16),
      paddingVertical: Responsive.pixelSizeVertical(5),
      fontFamily: 'Poppins-Regular',
    },
    forgetContainer:{
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgetText:{
      textDecorationLine: 'underline',
      fontSize: Responsive.fontPixel(16),
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