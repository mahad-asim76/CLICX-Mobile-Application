import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgb(242, 242, 242)',
    },
    IconImageStyle:{
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.15,
    },
    copyRightStyle:{
        width: 15,
        height: 15
    },
    fontStyle:{
        color: "#152E57",
        fontFamily: 'Poppins-SemiBold',
        paddingTop: 2,
        fontSize: 16,
    },
    welcomeText: {
        fontSize: 40,
        color: "#152E57",
        fontFamily: 'Poppins-Bold'
    },
    versionText: {
        fontSize: 25,
        color: "#152E57",
        fontFamily: 'Poppins-Medium'
    },
  });

  export default styles;