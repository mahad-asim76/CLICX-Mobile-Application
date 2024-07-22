import { StyleSheet, Dimensions } from 'react-native'

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
          marginTop: (Dimensions.get('screen').height)*0.35,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        android: {
          flex: 1,
          backgroundColor: 'rgba(250, 250, 250, 1)',
          marginTop: (Dimensions.get('screen').height)*0.35,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }),
    },
    modalTitle: {
      textAlign: 'left',
      fontSize: 18,
      color: '#fff',
      fontFamily: 'Poppins-Bold'
    },
    thresholdTitle: {
      textAlign: 'left',
      fontSize: 13,
      color: '#fff',
      fontFamily: 'Poppins-SemiBold'
    },
    modalTitleContainer: {
      marginBottom: 5,
      textAlign: 'left',
      paddingHorizontal: 20,
      paddingVertical: 15,
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
      height: 25,
      width: 25,
    },
    closeButtonContainer: {
      flexDirection: 'row',
      backgroundColor: '#152e57',
      paddingVertical: 13,
      paddingHorizontal: 30,
    },
    updateStyle:{
      color: '#ffffff', 
      fontFamily: 'Poppins-Bold',
      fontSize: 14
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center', 
      paddingVertical: 10,
      borderBottomWidth: 1.5,
      borderBottomColor: '#c2c1c1',
    },
    tableHeader: {
      flex: 1,
      fontFamily: 'Poppins-Bold',
      color: '#000',
      textAlign: 'center',
      ...Platform.select({
        ios: {
          fontSize: 11,
        },
        android: {
          fontSize: 12,
        },
      }),
    },
    tableDataRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#c2c1c1',
      paddingVertical: 10,
    },
    tableCell: {
      fontFamily: 'Poppins-SemiBold',
      flex:1,
      color: '#000',
      textAlign: 'center',
      ...Platform.select({
        ios: {
          fontSize: 10,
        },
        android: {
          fontSize: 11,
        },
      }),
    },
    backColor:{
      active:'rgba(144, 208, 239, 0.3)'
    },
    thresColor:{
      active:'rgba(21, 46, 87, 0.6)'
    }
  });

  export default styles;