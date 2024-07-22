import {StyleSheet, Dimensions, Platform} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignContent: 'center',
    },
    titleContainer:{
      backgroundColor: 'rgb(169, 216, 139)',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    titleStyle:{
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
      color: '#fff'
    },
    unauthorizedContainer:{
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingHorizontal: 10
    },
    unauthorizedStyle:{
      fontSize: 22,
      fontFamily: 'Poppins-SemiBold',
      color: '#152e57',
      textAlign: 'center'
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(225, 225, 225, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:1
    },
    loadingGif: {
      width: 70,
      height: 70,
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
    bodyContainer: { 
      padding: 10, 
      borderWidth: 1, 
      marginBottom: 2, 
      borderColor: 'rgb(169, 216, 139)', 
    },
    searchContainer: {
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    searchInput: {
      flex:1,
      borderColor: 'rgb(169, 216, 139)',
      borderWidth: 1,
      color: '#c2c2c1',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      paddingVertical: 8,
      fontFamily: 'Poppins-Regular',
      fontSize: 16
    },
    bodyTextStyle:{
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: '#000',
    },
    bodyTextBold:{
      fontSize: 14,
      fontFamily: 'Poppins-Bold',
      color: '#000',
    },
    bodyTextItalic:{
      fontSize: 14,
      fontFamily: 'Poppins-Bold',
      fontStyle: 'italic',
      color: '#000',
    },
    statusDateContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    statusContainer:{
      borderWidth: 1, 
      borderColor: 'rgb(169, 216, 139)', 
      padding: 5, 
      borderRadius: 5, 
    },
    dateContainer:{
      padding: 5, 
    },
    statusText:{
      fontSize: 10,
      fontFamily: 'Poppins-Bold',
      color: '#fff'
    },
    focusedInput:{
      borderColor: 'rgb(0, 128, 0)'
    },
    iconSize:{
      width: 40,
      height: 40,
    },
    invoiceTitle:{
      fontFamily: 'Poppins-Regular',
      fontSize: 13
    },
    invoiceMainContainer:{
      flex:1,
      backgroundColor: 'rgba(250, 250, 250, 1)',
      ...Platform.select({
        ios:{
          marginVertical: (Dimensions.get('screen').height)*0.3,
        },
        android:{
          marginVertical: (Dimensions.get('window').height)*0.25,
        }
      }),
      marginHorizontal: (Dimensions.get('screen').width)*0.03,
      borderRadius: 10,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'Poppins-Bold',
      textAlign : 'center'
    },
    invoiceBackground:{
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',    
    },
    invoiceTitleContainer: {
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
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
      height: 20,
      width: 20,
    },
    CaretSize:{
      height: 15,
      width: 15,
    },
    modalContainer:{
      paddingHorizontal: 20,
      flex:1,
      justifyContent: 'space-evenly',
    },
    iosSpecificContainer:{
      ...Platform.select({
        ios:{
          zIndex:2
        }
      })
    },
    statusDropdown: {
      height: 50,
    },
    pickerItem: {
      fontSize: 18, 
      fontFamily: 'Poppins-Bold', 
    },
    dateTimePickerContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateTimeContainer:{
      backgroundColor:'#fff',
      borderWidth: 1,
      borderColor: 'rgb(169, 216, 139)',
      borderRadius: 10,
      width: '49%',
      paddingVertical: 10,
      alignItems: 'center'
    },
    dateFont:{
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: 'rgb(169, 216, 139)'
    },
    button: {
      backgroundColor:'rgb(169, 216, 139)',
      borderRadius: 8,
      paddingVertical: 5,
      marginHorizontal: (Dimensions.get('screen').width)*0.2,
      alignItems: 'center'
    },
    buttontxt: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: '#fff'
    },
    errorText:{
      color: '#fb0000',
      fontFamily:'Poppins-Bold',
      paddingHorizontal: 5
    },
    backColor:{
      underlayColor: 'rgb(169, 216, 139)',
      InActive: 'rgba(169, 216, 139, 0.4)',
      Active: 'rgba(169, 216, 139, 0.2)',
      RedFlag:' rgb(255, 0, 0) ',
      GreenFlag:'#027148',
    },
    unauthorizedSize:{
      width: (Dimensions.get('screen').width)*0.8,
      height: (Dimensions.get('screen').height)*0.25,
    },
    MultibadgeStyle:{
      display: 'none',
    },
    MultilabelStyle:{
      height: (Dimensions.get('screen').height)*0.02,
      color: 'rgb(169, 216, 139)',
      fontSize: 16
    },
    MultiBoxStyle:{
      borderWidth: 1,
      borderColor: 'rgb(169, 216, 139)'
    },
    MultiDropdownStyle:{
      position: 'absolute',
      width: '100%',
      top: '100%',
      backgroundColor: '#fff',
      height: (Dimensions.get('screen').height)*0.25,
      zIndex: 2
    },
    MultiDropdownTextStyle:{
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: '#000',
    },
    MultiInputStyle:{
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      color: '#000', 
    },
    PickerSelectStyle:{
      inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgb(169, 216, 139)',
        fontFamily: 'Poppins-Regular',
        borderRadius: 4,
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'rgb(169, 216, 139)',
        borderRadius: 8,
        color: 'rgb(169, 216, 139)',
        fontFamily: 'Poppins-Regular',
      },
    }, 
    PickerStyleIconStyle:{
      padding: 15
    },
  });
  
  export default styles;