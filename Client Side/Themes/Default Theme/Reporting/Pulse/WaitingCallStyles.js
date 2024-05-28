import { StyleSheet, Dimensions } from 'react-native'
import Responsive from '../../../../src/components/Common Functions/Responsive';

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      justifyContent: 'flex-end',  
    },
    modalContainer: {
      ...Platform.select({
        ios: {
          flex: 1,
          backgroundColor: 'rgba(250, 250, 250, 1)',
          marginTop: (Dimensions.get('screen').height)*0.4,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        android: {
          flex: 1,
          backgroundColor: 'rgba(250, 250, 250, 1)',
          marginTop: (Dimensions.get('screen').height)*0.4,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }),
    },
    modalTitle: {
      textAlign: 'left',
      fontSize: Responsive.fontPixel(18),
      color: '#fff',
      fontFamily: 'Poppins-Bold'
    },
    modalTitleContainer: {
      marginBottom: 5,
      textAlign: 'left',
      paddingHorizontal: Responsive.pixelSizeHorizontal(20),
      paddingVertical: Responsive.pixelSizeVertical(15),
      alignItems: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius:10,
      backgroundColor: '#152e57',
      fontWeight: 'bold',
      flexDirection: 'row'
    },
    closeStyle:{
      position: 'absolute',
      right: 25,
    },
    CloseIconSize:{
      height: Responsive.heightPixel(25),
      width: Responsive.widthPixel(25),
    },
    closeButtonContainer: {
      flexDirection: 'row',
      backgroundColor: '#152e57',
      paddingVertical: Responsive.pixelSizeVertical(13),
      paddingHorizontal: Responsive.pixelSizeHorizontal(30),
    },
    updateStyle:{
      color: '#ffffff', 
      fontFamily: 'Poppins-Bold',
      fontSize: Responsive.fontPixel(14)
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center', 
      paddingVertical: Responsive.pixelSizeVertical(10),
      borderBottomWidth: 1.5,
      borderBottomColor: '#c2c1c1',
    },
    emptyDataRow:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    flagIconSize:{
      height: (Dimensions.get('screen').height)*0.8,
      width: (Dimensions.get('screen').width)*0.8,
    },
    svgCell:{
      fontFamily: 'Poppins-Bold',
      fontSize: Responsive.fontPixel(18),
      color: '#152e57',
    },
    tableHeader: {
      flex: 1,
      fontFamily: 'Poppins-Bold',
      textAlign: 'center',
      ...Platform.select({
        ios: {
          fontSize: Responsive.fontPixel(13),
        },
        android: {
          fontSize: Responsive.fontPixel(13),
        },
      }),
    },
    tableDataRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#c2c1c1',
      paddingVertical: Responsive.pixelSizeVertical(10),
    },
    tableCell: {
      fontFamily: 'Poppins-SemiBold',
      flex:1,
      textAlign: 'center',
      ...Platform.select({
        ios: {
          fontSize: Responsive.fontPixel(10),
        },
        android: {
          fontSize: Responsive.fontPixel(11),
        },
      }),
    },
  });

  export default styles;