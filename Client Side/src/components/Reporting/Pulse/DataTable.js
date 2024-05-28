import React from 'react';
import { View, Text, FlatList, LogBox} from 'react-native';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/HourlyTableStyles';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
LogBox.ignoreAllLogs(true);

const DataTable = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.Data === null || data.length === 0 ? (
        <View style={styles.emptyDataRow}>
          {svgIcon.SvgNoData({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
        </View>
      ):(
        <>
          <View style={styles.row}>
            {data.ColumnsLabels.map((label, index) => {
              const labelText = label.replace(/<\/?br>/g, '');
              const labelTextWithLineBreak = labelText.replace(/\(/g, '\n(');
              return (
                <View key={index} style={styles.cell}>
                  <Text style={styles.headerText}>{labelTextWithLineBreak}</Text>
                </View>
              );
            })}
          </View>
          <View>
              <FlatList
                data={data.Data}
                renderItem={({ item, index }) => (
                  <View style={[styles.subRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : '' }]}>
                    {data.ColumnsList.map((column, index) => (
                      <View key={index} style={styles.cell}>
                        <Text style={styles.cellText}>{item[column]}</Text>
                      </View>
                    ))}
                  </View>
                )} />
          </View>
        </>
      )}

    </View>
  );
};

export default DataTable;
