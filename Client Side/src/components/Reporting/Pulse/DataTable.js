import React from 'react';
import { View, Text, FlatList, LogBox, ScrollView} from 'react-native';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/HourlyTableStyles';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
LogBox.ignoreAllLogs(true);


const DataTable = ({ data }) => {

  let startIndex = 0;
  let endIndex = 6;
  let pattern = /RGU CR%/;

  if(data != null) {
    data.ColumnsLabels = data.ColumnsLabels.map(label => {
      if (pattern.test(label)) {
        return label.replace(pattern, "CloseRate%");
      }
      return label;
    });
  }

  return (
    <View style={styles.container}>
      {data === null || data.Data === null || data.length === 0 ? (
        <View style={styles.emptyDataRow}>
          {svgIcon.SvgNoData({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
        </View>
      ):(
        <>
        <View style={styles.row}>
          {data.ColumnsLabels.slice(startIndex, endIndex).map((label, index) => {
            const labelText = label.replace(/<\/?br>/g, '');
            const labelTextWithLineBreak = labelText.replace(/\(/g, '\n(');
            return (
              <View key={index} style={styles.cell}>
                <Text style={styles.headerText}>{labelTextWithLineBreak}</Text>
              </View>
            );
          })}
        </View>
        <FlatList
          data={data.Data}
          renderItem={({ item, index }) => (
            <View style={[styles.subRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : '' }]}>
              {data.ColumnsList.slice(startIndex, endIndex).map((column, index) => (
                <View key={index} style={styles.subCell}>
                  <Text style={styles.cellText}>{item[column]}</Text>
                </View>
              ))}
            </View>
          )} />
        </>
      )}
    </View>
  );
};

export default DataTable;
