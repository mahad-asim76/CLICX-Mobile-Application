import { StyleSheet } from 'react-native'
import Responsive from '../../../src/components/Common Functions/Responsive';

const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#152e57',
      paddingVertical: 12,
    },
    simpleFooter:{     
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 9,
    },
    scrollableSVG:{
      width : Responsive.widthPixel(25),
      height: Responsive.heightPixel(25)
    },
    text: {
      fontFamily: 'Poppins-Regular',
      paddingTop: 5,
      color: 'white',
      fontSize: 13,
    },
    iconSize:{
      size: Responsive.heightPixel(25)
    },
    fontStyle:{
      color: 'grey',
      fontFamily: 'Poppins-SemiBold',
      paddingBottom: 20,
      fontSize: 16,
    },
    focusedText: {
      color: '#fcbd39',
    },
    footerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default styles;