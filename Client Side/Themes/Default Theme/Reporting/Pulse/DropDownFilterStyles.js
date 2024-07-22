import { StyleSheet, Dimensions} from 'react-native'


const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    maxHeight: (Dimensions.get('window').height) * 0.35,
    backgroundColor: 'rgb(255, 255, 255)',
    borderBottomLeftRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 10,
      },
    }),
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: 'black',
  },
  selectedOption: {
    backgroundColor: '#90d0ef',
  },
  optionText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  });
  
  export default styles;