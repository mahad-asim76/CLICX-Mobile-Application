import { StyleSheet, Dimensions} from 'react-native'
import Responsive from '../../../../src/components/Common Functions/Responsive';


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
    paddingVertical: Responsive.pixelSizeVertical(3),
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
    paddingVertical: Responsive.pixelSizeVertical(10),
    paddingHorizontal: Responsive.pixelSizeHorizontal(20),
    borderBottomColor: 'black',
  },
  selectedOption: {
    backgroundColor: '#90d0ef',
  },
  optionText: {
    fontSize: Responsive.fontPixel(14),
    fontFamily: 'Poppins-Regular'
  },
  });
  
  export default styles;