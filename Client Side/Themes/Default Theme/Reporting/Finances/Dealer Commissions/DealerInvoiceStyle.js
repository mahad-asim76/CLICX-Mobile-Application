import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
    },
    modalTitle: {
      fontSize: 17,
      color: '#fff',
      fontFamily: 'Poppins-Bold',
      textAlign : 'center'
    },
    modalTitleContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 5,
      backgroundColor: 'rgb(169, 216, 139)',
      alignContent: 'center'
    },
    invoiceContainer:{
      flex:1,
      alignContent: 'center',
    },
    invoiceDealerContainer:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    agentIconSize:{
      width: 15,
      height: 15,
    },
    exclamationStyle:{
      paddingBottom: 5,
      paddingLeft: 5
    },
    rowContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButtonContainer: {
      flexDirection: 'row',
      backgroundColor: '#152e57',
      paddingVertical: 13,
      paddingHorizontal: 30,
    },
    touchablesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5
    },
    touchableContainer: {
      flex: 1,
      alignItems: 'center',
      borderWidth: 0.8,
      marginHorizontal: 5,
      paddingVertical: 20,
      borderRadius: 15,
      borderColor: 'rgb(169, 216, 139)', 
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
        },
      }),
    },
    flagSize:{
      height: 40,
      width: 40,
    },
    commissionContainer:{
      alignItems: 'center',
    },
    commissionsTitle:{
      fontFamily: 'Poppins-Medium',
      fontSize: 13,
      color: '#000',
    },
    amountTitle:{
      fontFamily: 'Poppins-Medium',
      paddingTop: 10,
      fontSize: 28,
      color: '#000',
    },
    paidAmountTitle:{
      fontFamily: 'Poppins-SemiBold',
      fontStyle: 'normal',
      fontSize: 13
    },
    invoiceTitle:{
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
      color: '#000',
    },
    invoiceMainContainer:{
      flex: 1,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      marginVertical: (Dimensions.get('screen').height)*0.2,
      marginHorizontal: (Dimensions.get('screen').height)*0.01,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    invoiceBackground:{
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',    
    },
    invoiceTitleContainer: {
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingVertical: 15,
      alignItems: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius:10,
      backgroundColor: 'rgb(169, 216, 139)',
      flexDirection: 'row'
    },
    closeStyle:{
      position: 'absolute',
      right: 20,
    },
    CloseIconSize:{
      height: 25,
      width: 25,
    },
    invoiceDoubleTopTouchablesContainer: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      borderWidth: 0.8,  
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'rgb(169, 216, 139)',
      backgroundColor: 'rgba(169, 216, 139, 1)'  
    },
    invoiceSingleTopTouchablesContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      borderWidth: 0.8,  
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'rgb(169, 216, 139)', 
      backgroundColor: 'rgba(169, 216, 139, 1)'  
    },
    invoiceDoubleTouchablesContainer: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.8,  
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'rgb(169, 216, 139)',
      backgroundColor: 'rgba(169, 216, 139, 0.4)'  
    },
    invoiceSingleTouchablesContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderWidth: 0.8,  
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'rgb(169, 216, 139)',
      backgroundColor: 'rgba(169, 216, 139, 0.4)'  
    },
    invoiceDoubleLastTouchablesContainer: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      borderWidth: 0.8,  
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'rgb(169, 216, 139)',
      backgroundColor: 'rgba(169, 216, 139, 1)'  
    },
    invoiceSingleLastTouchablesContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      borderWidth: 0.8,  
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: 'rgb(169, 216, 139)', 
      backgroundColor: 'rgba(169, 216, 139, 1)'  
    },
    invoiceFirsttouchableContainer: {
      flex: 2,
      alignItems: 'flex-start',
    },
    invoiceLasttouchableContainer: {
      flex: 1,
      alignItems: 'flex-end',     
    },
    contentContainer:{
      flexDirection: 'row',
      paddingHorizontal: 5,
    },
    invoiceDealerleftTitle:{
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12.5,
      textAlign: 'left'
    },
    invoiceDealerRightTitle:{
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12.5,
      textAlign: 'right'
    },
    invoiceTextContainer:{
      justifyContent:'center'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#152e57',
      paddingVertical: 12,
    },
    footerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerSize:{
      width: 25,
      height: 25,
    },
  });

  export default styles;