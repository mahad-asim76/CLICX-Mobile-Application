import { StyleSheet, Dimensions} from 'react-native'
import Responsive from '../../../../src/components/Common Functions/Responsive';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: Responsive.pixelSizeHorizontal(20),
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1.5,
      borderBottomColor: '#c2c1c1',
      alignItems: 'center',
    },
    subRow: {
      flex:1,
      flexDirection: 'row',
      paddingVertical: Responsive.pixelSizeVertical(10),
      borderBottomWidth: 0.5,
      borderBottomColor: '#c2c1c1',
    },
    cell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          paddingVertical: Responsive.pixelSizeVertical(8),
        },
        android: {
          paddingVertical: Responsive.pixelSizeVertical(10),
        },
      }),
    },
    emptyDataRow:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    flagIconSize:{
      height: (Dimensions.get('screen').height)*0.6,
      width: (Dimensions.get('screen').width)*0.8,
    },
    headerText: {
      fontFamily: 'Poppins-Bold',
      color: '#152e57',
      ...Platform.select({
        ios: {
          fontSize: Responsive.fontPixel(11),
        },
        android: {
          fontSize: Responsive.fontPixel(12),
        },
      }),
    },
    cellText: {
      ...Platform.select({
        ios: {
          fontSize: Responsive.fontPixel(11),
        },
        android: {
          fontSize: Responsive.fontPixel(12),
        },
      }),
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
      color: '#152e57',
    },
    backColor:{
      active:'rgba(144, 208, 239, 0.3)'
    },
  });
  
  export default styles;