import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 17,
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        textAlign : 'left'
    },
    invoiceTitle:{
      fontFamily: 'Poppins-Regular',
      fontSize: 13
    },
    invoiceMainContainer:{
      flex: 1,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      marginVertical: (Dimensions.get('screen').height)*0.15,
      marginHorizontal: (Dimensions.get('screen').height)*0.01,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    invoicePopUpontainer:{
      flex: 1,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      marginTop: (Dimensions.get('screen').height)*0.6,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    invoiceBackground:{
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',    
    },
    invoiceDealerContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
      textAlign: 'left',
      color: '#000'
    },
    invoiceDealerRightTitle:{
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12.5,
      textAlign: 'right',
      color: '#000'
    },
    invoiceTextContainer:{
      justifyContent:'center'
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    headerRow: {
      flexDirection: 'row',
    },
    columnHeader: {
      flex:1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'rgb(169, 216, 139)',  
    },
    tableFixedHeader: {
      fontFamily: 'Poppins-Bold',
      textAlign: 'left',
      fontSize: 16,
      color: '#000'
    },
    dataRow: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    tableDataRow:{
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      justifyContent: 'center',
      alignContent: 'center',
      borderBottomColor: 'rgb(169, 216, 139)', 
    },
    tableCell: {  
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'left',
      color: '#000',
      fontSize: 15,
    },
  });

  export default styles;