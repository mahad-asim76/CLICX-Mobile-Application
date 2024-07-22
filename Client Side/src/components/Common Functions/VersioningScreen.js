import React from 'react';
import { View, Text } from 'react-native';
import * as SvgIcon from '../../../Themes/SVG Icons/svgCommonComponent';
import styles from '../../../Themes/Default Theme/Common/versioningStyle';

const VersioningScreen = () => {
    const Year = new Date().getFullYear();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>CliCX</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        {SvgIcon.SvgLogo({ width: styles.IconImageStyle.width, height: styles.IconImageStyle.height })}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {SvgIcon.SvgCopyRight({ width: styles.copyRightStyle.width, height: styles.copyRightStyle.height, color: "#152E57" })}
            <Text style={styles.fontStyle}> {Year} ibex.digital</Text>
        </View>
      </View>
    </>
  );
};



export default VersioningScreen;
