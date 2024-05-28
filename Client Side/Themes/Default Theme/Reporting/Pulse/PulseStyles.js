import { Dimensions, StyleSheet} from 'react-native'
import Responsive from '../../../../src/components/Common Functions/Responsive';

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
    fontSize: Responsive.fontPixel(18),
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),
  },
  closeStyle:{
    position: 'absolute',
    right: 40,
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
    paddingTop: Responsive.pixelSizeVertical(20),
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
    fontSize: Responsive.fontPixel(16),
    color: '#152e57',
    fontFamily: 'Poppins-Bold'
  },

  tabStyle:{
    paddingHorizontal: Responsive.pixelSizeHorizontal(40),
    paddingVertical: Responsive.pixelSizeVertical(10),
  },
  tabText:{
    fontSize: Responsive.fontPixel(16),
    fontFamily: 'Poppins-Regular',
    color:'#696E7B'
  },
  timeContainer:{
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),
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
    fontSize: Responsive.fontPixel(13),
    color: '#fff',
    fontFamily: 'Poppins-Regular'
  },
  calendarFont:{
    paddingHorizontal: Responsive.pixelSizeHorizontal(5),
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: Responsive.fontPixel(15)
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
    width: Responsive.widthPixel(30),
    height: Responsive.heightPixel(30)
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
    paddingHorizontal: Responsive.pixelSizeHorizontal(20),
  },
  iconRightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive.pixelSizeHorizontal(20),
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
    color: 'black',
    fontSize: 18,
  },
  filterText: {
    ...Platform.select({
      ios: {
        fontSize: Responsive.fontPixel(13)
      },
      android: {
        fontSize: Responsive.fontPixel(14),
      },
    }),
    fontFamily: 'Poppins-Regular',
    color:'#696E7B'
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
    paddingVertical: Responsive.pixelSizeVertical(20),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(105, 110, 123, 0.2)',
  },
  scrollableRightStyle:{
    position: 'absolute',
    top: '40%',
    right: 0,
    paddingVertical: Responsive.pixelSizeVertical(20),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(105, 110, 123, 0.2)',
  },
  scrollableSVG:{
    height: Responsive.heightPixel(20),
    width: Responsive.widthPixel(20) 
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
    height: Responsive.heightPixel(30),
    width: Responsive.widthPixel(30),
  },
  agentIconSize:{
    width: Responsive.widthPixel(15),
    height: Responsive.heightPixel(15),
  },
  titleIconSize:{
    width: Responsive.widthPixel(60),
    height: Responsive.heightPixel(60),
  },
  flagIconSize:{
    height: Responsive.heightPixel(30),
    width: Responsive.widthPixel(30),
  },
  flagSize:{
    height: Responsive.heightPixel(25),
    width: Responsive.widthPixel(35)
  },
  CloseIconSize:{
    height: Responsive.heightPixel(25),
    width: Responsive.widthPixel(25),
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
    fontSize: Responsive.fontPixel(30),
    fontWeight: '700',
    color:'#696E7B',
  },
  rowThresholdUpperText: {
    fontSize: Responsive.fontPixel(30),
    fontWeight: '700',
    color:'#152e57',
  },
  rowLowerText: {
    fontSize: Responsive.fontPixel(16),
    paddingRight: Responsive.pixelSizeHorizontal(30),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color:'#696E7B'
  },
  rowThresholdLowerText: {
    fontSize: Responsive.fontPixel(16),
    paddingRight: Responsive.pixelSizeHorizontal(30),
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
    fontSize: Responsive.fontPixel(16) ,
    paddingRight: Responsive.pixelSizeHorizontal(30),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color:'#152e57'
  },
  rowRguLowerText: {
    fontSize: Responsive.fontPixel(30),
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
    fontSize: Responsive.fontPixel(30),
    fontWeight: '700',
    color:'#696E7B'
  },
  rowDetailLowerText: {
    fontSize: Responsive.fontPixel(16),
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
    paddingHorizontal: Responsive.pixelSizeHorizontal(20),
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
    paddingHorizontal: Responsive.pixelSizeHorizontal(20),
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(144, 208, 239, 0.3)',
    borderWidth: 1,
    borderColor: '#90d0ef', 
  },
  rowFirstRightText: {
    fontSize: Responsive.fontPixel(30),
    fontWeight: '700',
    color: "#152e57",
    textAlign: 'left',
  },
  rowFirstLeftText: {
    fontSize: Responsive.fontPixel(16),
    fontFamily: 'Poppins-Regular',
    paddingRight: Responsive.pixelSizeHorizontal(30),
    color: "#152e57",
    textAlign: 'left',
  },
  rowFirstVerticalLeftText: {
    fontSize: Responsive.fontPixel(15),
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
    marginTop: Responsive.pixelSizeVertical(15),
    paddingHorizontal: Responsive.pixelSizeHorizontal(40)
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
    paddingVertical: Responsive.pixelSizeVertical(10),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c2c2c1',
    flexDirection: 'row',
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),
  },
  dropdownIcon: {
    marginRight: Responsive.pixelSizeHorizontal(10),
  },
  dropdownOptionsContainer: {
    maxHeight: Responsive.heightPixel(500),
    position: 'absolute',
    marginHorizontal: Responsive.pixelSizeHorizontal(20),
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
    width: Responsive.widthPixel(97.5),
    height: Responsive.heightPixel(42),
  },
  liveInternalIcon:{
    width: Responsive.widthPixel(50),
    height: Responsive.heightPixel(50),
  },
  calendarIcon:{
    width: 45,
    height: 30,
  },
  calendarNewIcon:{
    width: Responsive.widthPixel(60),
    height: Responsive.heightPixel(40),
  },
  clockIcon:{
    width: Responsive.widthPixel(35),
    height: Responsive.heightPixel(35),
  },
  liveImageContainer:{
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  liveText:{
    fontWeight: 'bold',
    fontSize: Responsive.fontPixel(20),
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
    paddingBottom: Responsive.pixelSizeVertical(10),
  },
  modalCalendarContent: {
    height: (Dimensions.get('screen').height)*0.43,
    width: '100%',
    backgroundColor: '#fff',   
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#152e57',
    paddingVertical: Responsive.pixelSizeVertical(10),
    paddingHorizontal: Responsive.pixelSizeHorizontal(20),
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
    paddingVertical: Responsive.pixelSizeVertical(10),  
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),  
    borderRadius: 8,
    backgroundColor: 'rgba(144, 208, 239, 0.3)',
    borderWidth: 1,
    borderColor: '#90d0ef', 
  },
  dropdownChannelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Responsive.pixelSizeVertical(5),  
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),  
    borderRadius: 8,
    backgroundColor: 'rgba(144, 208, 239, 0.3)',
    borderWidth: 1,
    borderColor: '#90d0ef', 
  },
  dropdownCalendarItem: {
    flex: 1, 
    flexDirection: 'row',
    paddingVertical: Responsive.pixelSizeVertical(20),
    borderRadius: 8,
    backgroundColor: 'rgba(144, 208, 239, 0.3)',
    borderWidth: 1,
    borderColor: '#90d0ef',
    justifyContent: 'center',
    marginVertical: Responsive.pixelSizeVertical(5),
    marginHorizontal: Responsive.pixelSizeHorizontal(5),
  },
  touchablesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Responsive.pixelSizeHorizontal(10),   
    paddingVertical: Responsive.pixelSizeVertical(10), 
  },
  touchableContainer: {
    flex: 1,
    marginHorizontal: Responsive.pixelSizeHorizontal(10), 
  },
  touchableloneContainer: {
    flex:1,
    marginHorizontal: Responsive.pixelSizeHorizontal(120),
  },
  closeButton: {
    padding: 10,
    color: '#000000', 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdownLocationText:{
    paddingLeft: Responsive.pixelSizeHorizontal(15),
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.fontPixel(14),
    color: '#152e57', 
  },
  activeDropdownText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.fontPixel(15),
    color: '#fff', 
  },
  activeDropdownCalendarText:{
    paddingLeft: Responsive.pixelSizeHorizontal(15),
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.fontPixel(15),
    color: '#fff', 
  },
  dropdownTimeText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.fontPixel(15),
    color: '#152e57', 
  },
  dropdownText:{
    paddingLeft: Responsive.pixelSizeHorizontal(15),
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.fontPixel(14),
    color: '#152e57', 
  },
  globeStyle:{
    paddingLeft: 5,
    paddingRight: 5
  },
  coreIcon:{
    width: Responsive.widthPixel(43),
    height: Responsive.heightPixel(30)
  },
  coreNewIcon:{
    width: Responsive.widthPixel(43),
    height: Responsive.heightPixel(30)
  },
  dropdownFeedText:{
    paddingLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.fontPixel(15),
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
    paddingVertical: Responsive.pixelSizeVertical(12),
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
  