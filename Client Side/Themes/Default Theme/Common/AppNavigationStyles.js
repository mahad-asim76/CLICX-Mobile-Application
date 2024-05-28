import { StyleSheet } from 'react-native'
import Responsive from '../../../src/components/Common Functions/Responsive';

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#152E57',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerImage: {
        width: Responsive.widthPixel(150),
        height: Responsive.heightPixel(50),
    },
    headerTitleImage:{
        backgroundColor: '#152E57',
        borderBottomWidth: 2,
        elevation: 0,
        height : Platform.OS === 'ios' ? Responsive.heightPixel(100): 
        Platform.OS === 'android' ? Responsive.heightPixel(50) : undefined,
        headerStatusBarStyle: 'light-content', 
    },
    leftArrowStyle:{
        paddingRight: 10
    },
    scrollableSVG:{
        width : Responsive.widthPixel(25),
        height: Responsive.heightPixel(25)
    },
    footerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30
    },
    headerPulseImage:{
        width:100,
        height:40,  
    },
    headerRightContainer: {
        marginRight: 15,
    },
    iconContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
});
export default styles;