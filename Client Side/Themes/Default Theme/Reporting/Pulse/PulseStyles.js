import { Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    titleContainer:{
      flexDirection: 'row',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor: '#152e57',
      paddingVertical: 10,
      alignItems: 'center',
      paddingHorizontal: 30,
      justifyContent: 'space-evenly'
    },
    timeLogoContainer:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeLiveContainer:{
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    timeCalendarContainer:{
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalHeaderText: {
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      paddingHorizontal: 10,
    },
    closeStyle:{
      position: 'absolute',
      right: 20,
    },
    calendarContainer:{
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: '#152e57',
      borderWidth:1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    calendarLogoStyle:{
      width: 40,
      height: 40
    },
    tabContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 20,
    },
    contentOverlay: {
      flex: 1,
      backgroundColor: 'rgba(144, 208, 239, 0.3)'
    },  
    contentLoading: {
      opacity: 0.5,
    },
    activeTabItem:{
      borderBottomColor: 'white',
      backgroundColor: 'rgb(255, 255, 255)',
      borderColor: '#90d0ef',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 2,
      borderBottomWidth: 0
    },
    activeTabText:{
      fontSize:  16,
      color: '#152e57',
      fontFamily: 'Poppins-Bold'
    },

    tabStyle:{
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
    DealertabStyle:{
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    tabText:{
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      color:'#696E7B'
    },
    timeContainer:{
      paddingHorizontal: 10,
    },
    liveLogoContainer:{
      justifyContent: 'flex-end'
    },
    imageContainer:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    timeFont:{
      fontSize: 13,
      color: '#fff',
      fontFamily: 'Poppins-Regular'
    },
    calendarFont:{
      paddingHorizontal: 5,
      fontFamily: 'Poppins-Medium',
      color: '#fff',
      fontSize: 15
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: 'gray',
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
    headerText: {
      flex: 1,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'column',
      borderBottomWidth: 1,
      borderColor: 'gray',
      padding: 8,
    },
    column: {
      flex: 1,
      alignItems: 'left',
    },
    columnText: {
      textAlign: 'left',
      fontSize: 10,
      fontWeight: 'bold'
    },
    rowContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    exclamationStyle:{
      padding: 5,
      paddingBottom: 15
    },
    notificationNumberStyle:{
      width: 20, 
      height: 20,
      backgroundColor: '#f80355',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50, 
    },
    notification:{
      marginLeft: -10
    },
    notificationTitle:{
      fontFamily: 'Poppins-Bold', 
      color: '#fff',
      fontSize: 12
    },
    modelIcon:{
      paddingBottom: 10,
      paddingLeft: 5
    },
    LogoIcon:{
      width: 25,
      height: 25
    },
    LogoVerticalIcon:{
      paddingLeft: 10
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
    },
    filtersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(200, 200, 200, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1, 
    },
    loadingGif: {
      width: 70,
      height: 70,
    },
    iconLeftContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    iconRightContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    filterTouchable: {
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'lightgrey',
      flex: 1,
      marginRight: 8,
      ...Platform.select({
        ios: {
          shadowColor: 'grey',
          shadowOpacity: 0.5,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 3 },
        },
        android: {
          elevation: 15,
        },
      }),
    },
    footer: {
      alignItems: 'center',
      margin: 20
    },
    text: {
      color: '#000',
      fontSize: 18,
    },
    filterText: {
      color:'#696E7B',
      ...Platform.select({
        ios: {
          fontSize: 13
        },
        android: {
          fontSize: 14,
        },
      }),
      fontFamily: 'Poppins-Regular',
      
    },
    activeFilter: {
      backgroundColor: '#000000',
    },
    activeText: {
      color: 'white',
    },
    rowMainContainer: {
      flex:1,
      backgroundColor: '#ffffff'
    },
    rowMainVerticalContainer: {
      backgroundColor: '#ffffff',
    },
    scrollableLeftStyle:{
      position: 'absolute',
      top: '40%',
      left: 0,
      paddingVertical: 20,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      transform: [{ translateY: -12 }],
      backgroundColor: 'rgba(105, 110, 123, 0.2)',
    },
    scrollableRightStyle:{
      position: 'absolute',
      top: '40%',
      right: 0,
      paddingVertical: 20,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      transform: [{ translateY: -12 }],
      backgroundColor: 'rgba(105, 110, 123, 0.2)',
    },
    scrollableSVG:{
      height: 20,
      width: 20 
    },
    scrollableContainer:{
      flex:1,
      paddingHorizontal: 5,
    },
    scrollableVerticalOneContainer:{
      flex:1,
      paddingHorizontal: 5,
      paddingTop: 10,
      backgroundColor: '#ffffff',
    },
    scrollableVerticalTwoContainer:{
      flex:1,
      paddingHorizontal: 5,
      backgroundColor: '#ffffff',
    },
    rowContainer: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownIconSize:{
      height:  25,
      width:  25,
    },
    agentIconSize:{
      width:  15,
      height:  15,
    },
    titleIconSize:{
      width:  50,
      height:  50,
    },
    flagIconSize:{
      height:  30,
      width:  30,
    },
    flagSize:{
      height:  25,
      width:  35
    },
    CloseIconSize:{
      height:  22,
      width:  22,
    },
    row: {
      paddingVertical:10,
      paddingHorizontal: 20,
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 8,
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: '#c2c1c1',
      ...Platform.select({
        ios: {
          shadowColor: 'transparent',
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
        },
        android: {
          shadowColor: 'transparent',
          shadowOpacity: 0.6,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
        },
      }),
    },
    animatedBackground: {
      backgroundColor: 'rgba(144, 208, 239, 0.8)',
      borderColor: '#90d0ef',
      borderWidth: 1,
    },
    rowUpperText: {
      fontSize:  30,
      fontWeight: '700',
      color:'#696E7B',
    },
    rowThresholdUpperText: {
      fontSize:  30,
      fontWeight: '700',
      color:'#152e57',
    },
    rowLowerText: {
      fontSize:  16,
      paddingRight:  30,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color:'#696E7B'
    },
    rowThresholdLowerText: {
      fontSize:  16,
      paddingRight:  30,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color:'#152e57'
    },
    rguRow: {
      paddingVertical:10,
      paddingHorizontal: 20,
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 10,
      backgroundColor: 'rgba(144, 208, 239, 0.3)',
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: '#90d0ef',
    },
    rowRguUpperText: {
      fontSize:  16 ,
      paddingRight:  30,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color:'#152e57'
    },
    rowRguLowerText: {
      fontSize:  30,
      fontWeight: '700',
      color:'#152e57'
    },
    detailRow: {
      paddingVertical:10,
      paddingHorizontal: 20,
      flex: 1,
      alignItems: 'flex-start',
      marginHorizontal: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#c2c1c1',
    },
    rowDetailUpperText: {
      fontSize:  30,
      fontWeight: '700',
      color:'#696E7B'
    },
    rowDetailLowerText: {
      fontSize:  16,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color:'#696E7B'
    },
    detailFirstRow: {
      flex:1,
      paddingVertical:8,
      paddingHorizontal: 20,
      alignItems: 'flex-start',
      marginHorizontal: 5,
      borderRadius: 10,
      backgroundColor: 'rgba(144, 208, 239, 0.3)',
      borderWidth: 1,
      borderColor: '#90d0ef', 
    },
    rowVerticalContainer:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    detailVerticalRow: {
      alignItems: 'flex-start',
      paddingTop: 10,
      paddingBottom:10,
      paddingHorizontal:  20,
      flex: 1,
      marginHorizontal: 5,
      marginBottom: 15,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#c2c1c1',
    },
    detailFirstVerticalRow:{
      alignItems: 'flex-start',
      paddingTop: 10,
      paddingBottom:10,
      paddingHorizontal:  20,
      flex: 1,
      marginHorizontal: 5,
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: 'rgba(144, 208, 239, 0.3)',
      borderWidth: 1,
      borderColor: '#90d0ef', 
    },
    rowFirstRightText: {
      fontSize:  30,
      fontWeight: '700',
      color: "#152e57",
      textAlign: 'left',
    },
    rowFirstLeftText: {
      fontSize:  16,
      fontFamily: 'Poppins-Regular',
      paddingRight:  30,
      color: "#152e57",
      textAlign: 'left',
    },
    rowFirstVerticalLeftText: {
      fontSize:  15,
      fontFamily: 'Poppins-Regular',
      paddingRight: 10,
      color: "#152e57",
      fontWeight: '500',
      textAlign: 'left',
    },
    dropdownContainer: {
      position: 'relative',
      ...Platform.select({
        ios: {
          zIndex:2,
        }
      }),
      marginTop:  15,
      paddingHorizontal:  40
    },
    dropdownContent: {
      marginTop: 2,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentContainer:{
      flex:1
    },
    dropdownTrigger: {
      backgroundColor: 'rgb(255,255,255)',
      alignItems: 'center',
      paddingVertical:  10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#c2c2c1',
      flexDirection: 'row',
      paddingHorizontal:  10,
    },
    dropdownIcon: {
      marginRight:  10,
    },
    dropdownOptionsContainer: {
      maxHeight:  500,
      position: 'absolute',
      marginHorizontal:  20,
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 5,
      zIndex: 1,
      elevation: 5,
    },
    dropdownLocationTrigger: {
      justifyContent:'center',
      alignItems: 'center'
    },
    dropdownAgentTrigger:{
      flexDirection: 'row',
    },
    LogoContainer:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    liveIcon:{
      width: 87.75,
      height: 37.8
    },
    liveInternalIcon:{
      width:  40,
      height:  40,
    },

    calendarIcon:{
      width: 45,
      height: 30,
    },
    calendarNewIcon:{
      width:  60,
      height:  40,
    },
    clockIcon:{
      width:  30,
      height:  30,
    },
    liveImageContainer:{
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    liveText:{
      fontWeight: 'bold',
      fontSize: 20,
      color: '#eb003b'
    },
    activeDropdownTrigger: {
      backgroundColor: 'lightblue',
      padding: 10,
      margin: 5,
      position: 'relative',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalContent: {
      width: '100%',
      backgroundColor: '#fff',   
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 10,
    },
    modalCalendarContent: {
      height: (Dimensions.get('screen').height)*0.43,
      width: '100%',
      backgroundColor: '#fff',   
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 10,
    },
    modalHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#152e57',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalCalendarContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,  
      paddingHorizontal: 10,  
      borderRadius: 8,
      backgroundColor: 'rgba(144, 208, 239, 0.3)',
      borderWidth: 1,
      borderColor: '#90d0ef', 
    },
    dropdownChannelItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,  
      paddingHorizontal: 10,  
      borderRadius: 8,
      backgroundColor: 'rgba(144, 208, 239, 0.3)',
      borderWidth: 1,
      borderColor: '#90d0ef', 
    },
    dropdownCalendarItem: {
      flex: 1, 
      flexDirection: 'row',
      paddingVertical: 20,
      borderRadius: 8,
      backgroundColor: 'rgba(144, 208, 239, 0.3)',
      borderWidth: 1,
      borderColor: '#90d0ef',
      justifyContent: 'center',
      marginVertical: 5,
      marginHorizontal: 5,
    },
    touchablesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,   
      paddingVertical: 10, 
    },
    touchableContainer: {
      flex: 1,
      marginHorizontal: 10, 
    },
    touchableloneContainer: {
      flex:1,
      marginHorizontal: 100,
    },
    closeButton: {
      padding: 10,
      color: '#000000', 
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdownLocationText:{
      paddingLeft: 15,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      color: '#152e57', 
    },
    activeDropdownText:{
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15,
      color: '#fff', 
    },
    activeDropdownCalendarText:{
      paddingLeft: 15,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15,
      color: '#fff', 
    },
    dropdownTimeText:{
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15,
      color: '#152e57', 
    },
    dropdownText:{
      paddingLeft: 15,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      color: '#152e57', 
    },
    globeStyle:{
      paddingLeft: 5,
      paddingRight: 5
    },
    coreIcon:{
      width: 43,
      height: 30
    },
    coreNewIcon:{
      width: 43,
      height: 30
    },
    dropdownFeedText:{
      paddingLeft: 10,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15,
      color: '#152e57', 
    },
    globeMainStyle:{
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop:1
    },
    flagIconStyle:{
      marginTop: 5,
      marginLeft: 10
    },
    activeDropdownItem: {
      backgroundColor: '#152e57',
      borderColor: '#c2c2c1',
      alignItems: 'center',
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
    ThresholdBackColor:{
      active: "#152e57",
      inactive: "#696E7B"
    },
    NotMainContainer:{ 
      flexDirection: "column" 
    },
    RecordSize:{
      height: (Dimensions.get('screen').height)*0.6,
      width: (Dimensions.get('screen').width)*0.8,
    },
    emptyDataRow:{
      flex:1,
      justifyContent: 'center',
      backgroundColor: '#fff',
      alignItems: 'center'
    },
  });
  export default styles;
  