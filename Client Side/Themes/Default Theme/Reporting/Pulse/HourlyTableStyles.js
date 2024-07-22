import { StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1.5,
      borderBottomColor: '#c2c1c1',
      alignItems: 'center',
    },
    subRow: {
      flexDirection: 'row',
      paddingVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: '#c2c1c1',
    },
    cell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          paddingVertical: 8
        },
        android: {
          paddingVertical: 9
        },
      }),
    },
    subCell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          fontSize: 8
        },
        android: {
          fontSize: 9
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
      textAlign: 'center',
      ...Platform.select({
        ios: {
          fontSize: 9,
        },
        android: {
          fontSize: 9.5,
        },
      }),
    },
    cellText: {
      ...Platform.select({
        ios: {
          fontSize: 9,
        },
        android: {
          fontSize: 9.5,
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