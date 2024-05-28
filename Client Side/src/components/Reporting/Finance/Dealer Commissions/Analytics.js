import React, {useState} from 'react';
import { View, ScrollView, Text,Dimensions} from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryLegend, VictoryLabel } from "victory-native";
import styles from '../../../../../Themes/Default Theme/Reporting/Finances/Dealer Commissions/AnalyticsStyle.js';

const Analytics = ({ dateName, Data }) => {
  const [hiddenSeries, setHiddenSeries] = useState([]);
  const [hiddenAboveSeries, setHiddenAboveSeries] = useState([]);

  const toggleBelowSeries = (seriesName) => {
    if (hiddenSeries.includes(seriesName)) {
      setHiddenSeries(hiddenSeries.filter(item => item !== seriesName));
    } else {
      setHiddenSeries([...hiddenSeries, seriesName]);
    }
  };

  const toggleAboveSeries = (seriesName) => {
    if (hiddenAboveSeries.includes(seriesName)) {
      setHiddenAboveSeries(hiddenAboveSeries.filter(item => item !== seriesName));
    } else {
      setHiddenAboveSeries([...hiddenAboveSeries, seriesName]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.modalTitleContainer}>
        <Text style={styles.modalTitle}>{dateName}</Text>
      </View>
      <View style={styles.ChartContainer}>
        <VictoryChart
          height={Dimensions.get('window').height * 0.5}
          theme={VictoryTheme.material}
          domainPadding={{ x: 10 }}
          style={{ 
            background: {
              fill: "rgba(169, 216, 139, 0.7)",
            },
          }}
          >
          <VictoryLabel
            text="Day Wise Commission"
            x={Dimensions.get('screen').width / 2}
            y={30}
            textAnchor="middle"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          />
          <VictoryAxis 
            style={{
              axisLabel: {fontSize: 12, padding: 25, color: '#000', },
              tickLabels: {fontSize: 8, padding: 15, color: '#000', angle: '-30'},
              grid: {stroke: "none"}
            }} 
          />
          <VictoryAxis dependentAxis
            label={!hiddenAboveSeries.includes('Commission Paid') || !hiddenAboveSeries.includes('Commission Payable') || !hiddenAboveSeries.includes('Forecasting Commissions')? 'Commissions ($)' : ''}
            orientation='left'
            style={{
              axisLabel: {fontSize: 12, padding: 35, color: '#000'},
              tickLabels: {fontSize: 8, padding: 2, color: '#000'},
              grid: {stroke: "#000", strokeDasharray: null, strokeWidth: 0.2},
            }}
           
          />
          <VictoryAxis dependentAxis
            label={!hiddenSeries.includes('RGUs Paid') || !hiddenSeries.includes('RGUs Payable') ? 'RGUs ($)' : ''}
            orientation='right'
            style={{
              axisLabel: {fontSize: 12, padding: 20, color: '#000'},
              tickLabels: {fontSize: 8, padding: 2, color: '#000'},
              grid: {stroke: "#000", strokeDasharray: null, strokeWidth: 0.2},
            }}
          />
          {!hiddenAboveSeries.includes('RGUs Paid') && (
          <VictoryLine
            data={Data.bigData_Chart.categories.map((category, index) => ({
              x: category, 
              y: Data.bigData_Chart.PaidRGUS[index]
            }))}
            style={{
              data: { stroke: "blue", strokeWidth:3 }
            }}
            interpolation="monotoneX"
          />)}
          {!hiddenAboveSeries.includes('RGUs Payable') && (
          <VictoryLine
            data={Data.bigData_Chart.categories.map((category, index) => ({
              x: category, 
              y: Data.bigData_Chart.UnPaidRGUS[index]
            }))}
            style={{
              data: { stroke: "red", strokeWidth: 3 }
            }}
            interpolation="monotoneX"
          />)}
          {!hiddenAboveSeries.includes('Commission Paid') && (
          <VictoryLine
            data={Data.bigData_Chart.categories.map((category, index) => ({
              x: category,  
              y: Data.bigData_Chart.PaidCommission[index]
            }))}
            style={{
              data: { stroke: "green", strokeWidth: 3}
            }}
            interpolation="monotoneX"
          />)}
          {!hiddenAboveSeries.includes('Commission Payable') && (
          <VictoryLine
            data={Data.bigData_Chart.categories.map((category, index) => ({
              x: category, 
              y: Data.bigData_Chart.UnPaidCommission[index]
            }))}
            style={{
              data: { stroke: "orange", strokeWidth: 3  }
            }}
            interpolation="monotoneX"
          />)}
          {!hiddenAboveSeries.includes('Forecasting Commissions') && (
          <VictoryLine
            data={Data.bigData_Chart.categories.map((category, index) => ({
              x: category, 
              y: Data.bigData_Chart.ForecastedCommission[index]
            }))}
            style={{
              data: { stroke: "purple", strokeWidth: 3  }
            }}
            interpolation="monotoneX"
          />)}
        </VictoryChart>
        <View style={{height: Dimensions.get('screen').height * 0.05, paddingTop: 5, paddingLeft: 5}}>
          <VictoryLegend
            orientation="horizontal"
            style={{ labels: { fontSize: 10, fontWeight: 'bold'}}}
            theme={VictoryTheme.material}
            itemsPerRow={3}
            gutter={10}
            data={[
              { name: 'RGUs Paid', symbol: { fill: 'blue' , type:'diamond'} },
              { name: 'RGUs Payable', symbol: { fill: 'red' , type:'diamond'} },
              { name: 'Commission Paid', symbol: { fill: 'green' } },
              { name: 'Commission Payable', symbol: { fill: 'orange' } },
              { name: 'Forecasting Commissions', symbol: { fill: 'purple' } },
            ]}
            events={[{
              target: "labels",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        toggleAboveSeries(props.datum.name);
                      }
                    }
                  ];
                }
                
              }
            }]}
          />
        </View>
        <VictoryChart
          height={Dimensions.get('window').height * 0.5}
          theme={VictoryTheme.material}
          domainPadding={{ x: 10 }}
          style={{ 
            background: {
              fill: "rgba(169, 216, 139, 0.7)",
            },
          }}
        >
          <VictoryAxis 
            style={{
              axisLabel: {fontSize: 12, padding: 35, color: '#000', },
              tickLabels: {fontSize: 8, padding: 15, color: '#000', angle: '-30'},
              grid: {stroke: "none"}
            }}
          />
          <VictoryAxis dependentAxis
            label={!hiddenSeries.includes('Commission Paid') || !hiddenSeries.includes('Commission Payable') ? 'Commissions ($)' : ''}
            domain={[0, 50]}
            orientation='left'
            style={{
              axisLabel: {fontSize: 12, padding: 35, color: '#000'},
              tickLabels: {fontSize: 8, padding: 2, color: '#000'},
              grid: {stroke: "#000", strokeDasharray: null, strokeWidth: 0.2},
            }}
          />
           <VictoryAxis dependentAxis
            label={!hiddenSeries.includes('RGUs Paid') || !hiddenSeries.includes('RGUs Payable') ? 'RGUs ($)' : ''}
            orientation='right'
            style={{
              axisLabel: {fontSize: 12, padding: 20, color: '#000'},
              tickLabels: {fontSize: 8, padding: 2, color: '#000'},
              grid: {stroke: "#000", strokeDasharray: null, strokeWidth: 0.2},
            }}
          />
          <VictoryLabel
            text="Provider Wise Charges"
            x={Dimensions.get('screen').width / 2}
            y={30}
            textAnchor="middle"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          />
          {!hiddenSeries.includes('RGUs Paid') && (
            <VictoryLine
              data={Data.ProviderWiseData.providerWiseDataCharts.categories.map((category, index) => ({
                x: category,
                y: Data.ProviderWiseData.providerWiseDataCharts.RGUSPaid[index],
              }))}
              style={{
                data: { stroke: 'blue', strokeWidth: 3 },
              }}
              interpolation="monotoneX"
            />
          )}
          {!hiddenSeries.includes('RGUs Payable') && (
            <VictoryLine
              data={Data.ProviderWiseData.providerWiseDataCharts.categories.map((category, index) => ({
                x: category,
                y: Data.ProviderWiseData.providerWiseDataCharts.RGUSUnPaid[index],
              }))}
              style={{
                data: { stroke: 'red', strokeWidth: 3 },
              }}
              interpolation="monotoneX"
            />
          )}
          {!hiddenSeries.includes('Commission Paid') && (
            <VictoryLine
              data={Data.ProviderWiseData.providerWiseDataCharts.categories.map((category, index) => ({
                x: category,
                y: Data.ProviderWiseData.providerWiseDataCharts.CommissionPaid[index],
              }))}
              style={{
                data: { stroke: 'green', strokeWidth: 3  },
              }}
              interpolation="monotoneX"
            />
          )}
          {!hiddenSeries.includes('Commission Payable') && (
            <VictoryLine
              data={Data.ProviderWiseData.providerWiseDataCharts.categories.map((category, index) => ({
                x: category,
                y: Data.ProviderWiseData.providerWiseDataCharts.CommissionUnPaid[index],
              }))}
              style={{
                data: { stroke: 'orange',strokeWidth: 3 },
              }}
              interpolation="monotoneX"
            />  
          )}
        </VictoryChart>
        <View style={{height: Dimensions.get('screen').height * 0.05, paddingTop: 15, paddingLeft: 5}}>
          <VictoryLegend
            orientation="horizontal"
            style={{ labels: { fontSize: 10, fontWeight: 'bold'}}}
            theme={VictoryTheme.material}
            gutter={15}
            data={[
              { name: 'RGUs Paid', symbol: { fill: 'blue' , type:'diamond'} },
              { name: 'RGUs Payable', symbol: { fill: 'red' , type:'diamond'} },
              { name: 'Commission Paid', symbol: { fill: 'green' } },
              { name: 'Commission Payable', symbol: { fill: 'orange' } }
            ]}
            events={[{
              target: "labels",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        toggleBelowSeries(props.datum.name);
                      }
                    }
                  ];
                }
                
              }
            }]}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Analytics;
