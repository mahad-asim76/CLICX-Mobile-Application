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
          marginTop: (Dimensions.get('screen').height)*0.45,
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
    agentIconSize:{
      width: Responsive.widthPixel(18),
      height: Responsive.heightPixel(18),
    },
    exclamationStyle:{
      paddingLeft: 5,
      paddingBottom: 15
    },
    modalTitle: {
      textAlign: 'left',
      fontSize: Responsive.fontPixel(18),
      color: '#fff',
      fontFamily: 'Poppins-Bold'
    },
    alertContainer:{
      flex:1,
      flexDirection: 'row'
    },
    modalTitleContainer: {
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
    tabContainer:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(144, 208, 239, 0.3)'
    },
    activeTabItem:{
      borderBottomColor: 'white',
      backgroundColor: 'rgb(255, 255, 255)',
      borderColor: '#152e57',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 2,
      borderBottomWidth: 0
    },
    activeTabText:{
      fontSize: Responsive.fontPixel(16),
      color: '#152e57',
      fontFamily: 'Poppins-Bold'
    },
    tabStyle:{
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    tabText:{
      fontSize: Responsive.fontPixel(16),
      fontFamily: 'Poppins-Bold',
      color:'#696E7B'
    },
    salesContainer:{
      backgroundColor: 'rgba(144, 208, 239, 0.8)',
      marginHorizontal: 10,
    },
    rguContainer:{
      backgroundColor: 'rgba(144, 208, 239, 0.8)',
      marginHorizontal: 10,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    headerRow: {
      flexDirection: 'row',
    },
    headerRGURow: {
      flexDirection: 'row',
      backgroundColor:  '#c2c1c1', 
    },
    columnHeader: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#c2c1c1',  
    },
    columnRGUHeader: {
      paddingVertical: 10,
      paddingHorizontal: 10,
       
    },
    tableFixedHeader: {
      fontFamily: 'Poppins-Bold',
      textAlign: 'left',
      ...Platform.select({
          ios: {
            fontSize: Responsive.fontPixel(15),
          },
          android: {
            fontSize: Responsive.fontPixel(16),
          },
        }),
    },
    dataRow: {
      flexDirection: 'row',
    },
    dataRGURow: {
      flexDirection: 'row',
      ackgroundColor:  '#c2c1c1', 
    },
    tableDataRow:{
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#c2c1c1', 
    },
    tableRGURow:{
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    tableCell: {     
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'left',
      textAlignVertical: 'center',
      ...Platform.select({
      ios: {
          fontSize: Responsive.fontPixel(14),
       },
      android: {
          fontSize: Responsive.fontPixel(15),
       },
      }),
    },
    tableRGUCell: {     
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'left',
      ...Platform.select({
      ios: {
          fontSize: Responsive.fontPixel(16),
       },
      android: {
          fontSize: Responsive.fontPixel(17),
       },
      }),
    },
    rguTitle:{
      paddingHorizontal: 10,
      paddingVertical: 5,
      textAlign: 'left',
      fontSize: 20,
      color: '#152e57',
      fontFamily: 'Poppins-Bold'
    },
    scrollableBorder:{
      marginHorizontal: 10,
      borderWidth: 0.5,
      borderColor: '#c2c1c1'
    },
    tabRGUContainer:{
      flex:1,
      paddingVertical:10,
    },
    backColor:{
      active: 'rgba(144, 208, 239, 0.3)'
    }
  });

  export default styles;