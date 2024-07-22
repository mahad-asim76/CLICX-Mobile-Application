import { StyleSheet } from 'react-native'

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
      width : 25,
      height: 25
    },
    copyRightStyle:{
      width: 15,
      height: 15
    },
    text: {
      fontFamily: 'Poppins-Regular',
      paddingTop: 5,
      color: 'white',
      fontSize: 13,
    },
    iconSize:{
      size: 25
    },
    fontStyle:{
      color: 'grey',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      paddingTop: 2
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