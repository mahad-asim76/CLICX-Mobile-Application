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
      width: 18,
      height: 18,
    },
    exclamationStyle:{
      paddingLeft: 5,
      paddingBottom: 15
    },
    modalTitle: {
      textAlign: 'left',
      fontSize: 18,
      color: '#fff',
      fontFamily: 'Poppins-Bold'
    },
    alertContainer:{
      flex:1,
      flexDirection: 'row'
    },
    modalTitleContainer: {
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
      fontSize: 16,
      color: '#152e57',
      fontFamily: 'Poppins-Bold'
    },
    tabStyle:{
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    tabText:{
      fontSize: 15,
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
      color: '#000',
      ...Platform.select({
        ios: {
          fontSize: 15,
        },
        android: {
          fontSize: 16,
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
      alignContent: 'center'
    },
    tableCell: {     
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'left',
      color: '#000',
      textAlignVertical: 'center',
      ...Platform.select({
      ios: {
          fontSize: 14,
       },
      android: {
          fontSize: 15,
       },
      }),
    },
    tableRGUCell: {     
      fontFamily: 'Poppins-SemiBold',
      textAlign: 'left',
      color: '#000',
      ...Platform.select({
      ios: {
          fontSize: 14,
       },
      android: {
          fontSize: 15,
       },
      }),
    },
    rguTitle:{
      paddingHorizontal: 10,
      paddingVertical: 5,
      textAlign: 'left',
      fontSize: 18,
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