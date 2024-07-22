import React from 'react';
import { View, Text, FlatList, Modal, Alert, TouchableOpacity, ScrollView, LogBox} from 'react-native';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/PulseDataModalStyles.js';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
LogBox.ignoreAllLogs(true);

export function InitiatedTable (isVisible, closeModal, data, statusName, updateTime) {
    
    let sortedData;
    if (data.Data[0].hasOwnProperty('TFN')) {
        sortedData = data.Data.slice().sort((a, b) => {
            return a['TFN'].localeCompare(b['TFN']);
        });
    } else {
        sortedData = data.Data.slice().sort((a, b) => {
            return a['TFN Skill'].localeCompare(b['TFN Skill']);
        });
    }

    let startIndex = 2;
    let endIndex = 8;

    if (data.ColumnsLabels.includes('TFN')) {
        startIndex = 0;
        endIndex = 8;
    } else {
        startIndex = 2;
        endIndex = 8;
    }

    const calculateColumnWidths = () => {
      const widths = {
        'TFN': 200,
        'Call Skill': 100,
        'IVR Hangups': 150,
        'Initiated': 100,
        'Offer': 100,
        'TFN Skill': 100,
        'Short Abandons': 180,
        'Answer': 100
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{statusName}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <View style={{flex:1 }}>
              <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
                <View style={styles.container}>
                  <View style={styles.headerRow}>
                    {data.ColumnsLabels.slice(startIndex, endIndex).map((label, index) => (
                      <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                        <Text style={styles.tableFixedHeader}>{label}</Text>
                      </View>
                    ))}
                  </View>
                  <FlatList
                    data={sortedData}
                    renderItem={({ item, index }) => (
                      <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                        {data.ColumnsLabels.slice(startIndex, endIndex).map((key, columnIndex) => (
                          <View key={columnIndex} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                            <Text style={styles.tableCell}>{item[key]}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.closeButtonContainer}>
              <Text style={styles.updateStyle}>{updateTime}</Text>
            </View>
          </View>
        </View>
    </Modal>
  );
  };
  
export function AnsweredTable (isVisible, closeModal, data, statusName, updateTime) {
    let sortedData;
    if (data.Data[0].hasOwnProperty('TFN')) {
        sortedData = data.Data.slice().sort((a, b) => {
            return a['TFN'].localeCompare(b['TFN']);
        });
    } else {
        sortedData = data.Data.slice().sort((a, b) => {
            return a['TFN Skill'].localeCompare(b['TFN Skill']);
        });
    }

    let startIndex = 2;
    let endIndex = 8;

    if (data.ColumnsLabels.includes('TFN')) {
        startIndex = 0;
        endIndex = 8;
    } else {
        startIndex = 2;
        endIndex = 8;
    }


    const calculateColumnWidths = () => {
      const widths = {
        'Call Skill': 100,
        'Agent Location': 150,
        'Close Rate': 150,
        'Answered': 150,
        'TFN Skill': 100,
        'TFN': 200,
        'RGUs': 100
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();
    
    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{statusName}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(startIndex, endIndex).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>

                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(startIndex, endIndex).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style= {styles.tableCell}>{item[key]}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function AbandonedTable (isVisible, closeModal, data, statusName, updateTime) {
    let sortedData;
    if (data.Data[0].hasOwnProperty('TFN')) {
        sortedData = data.Data.slice().sort((a, b) => {
            return a['TFN'].localeCompare(b['TFN']);
        });
    } else {
        sortedData = data.Data.slice().sort((a, b) => {
            return a['TFN Skill'].localeCompare(b['TFN Skill']);
        });
    }

    let startIndex = 2;
    let endIndex = 10;

    if (data.ColumnsLabels.includes('TFN')) {
        startIndex = 0;
        endIndex = 10;
    } else {
        startIndex = 2;
        endIndex = 10;
    }


    const calculateColumnWidths = () => {
      const widths = {
        'Call Skill': 100,
        'TFN Skill': 100,
        'TFN': 200,
        '0 Sec': 100,
        '1-5 Sec': 100,
        '6-15 Sec': 100,
        '16-30 Sec': 100,
        '31-60 Sec': 100,
        '> 60 Sec': 100
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();
    
    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{statusName}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <View style={{flex:1 }}>
              <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
                <View style={styles.container}>
                  <View style={styles.headerRow}>
                    {data.ColumnsLabels.slice(startIndex,endIndex).map((label, index) => (
                      <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                        <Text style={styles.tableFixedHeader}>{label}</Text>
                      </View>
                    ))}
                  </View>

                  <FlatList
                    data={sortedData}
                    renderItem={({ item , index}) => (
                      <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                        {data.ColumnsLabels.slice(startIndex,endIndex).map((key, index) => (
                          <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                            <Text style= {styles.tableCell}>{item[key]}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.closeButtonContainer}>
              <Text style={styles.updateStyle}>{updateTime}</Text>
            </View>
          </View>
        </View>
    </Modal>
  );
  };

export function AbandonedShortTable (isVisible, closeModal, data, statusName, updateTime) {

  let sortedData;
  if (data.Data[0].hasOwnProperty('TFN')) {
      sortedData = data.Data.slice().sort((a, b) => {
          return a['TFN'].localeCompare(b['TFN']);
      });
  } else {
      sortedData = data.Data.slice().sort((a, b) => {
          return a['TFN Skill'].localeCompare(b['TFN Skill']);
      });
  }

  let startIndex = 2;
  let endIndex = 7;

  if (data.ColumnsLabels.includes('TFN')) {
      startIndex = 0;
      endIndex = 7;
  } else {
      startIndex = 2;
      endIndex = 7;
  }


  const calculateColumnWidths = () => {
    const widths = {
      'Call Skill': 100,
      'TFN Skill': 100,
      'TFN': 200,
      '0 Sec': 100,
      '1-5 Sec': 100,
      '6-15 Sec': 100,
    };

    return widths;
  }; 
  const columnWidths = calculateColumnWidths();
  
  return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{statusName}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(startIndex,endIndex).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(startIndex,endIndex).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style= {styles.tableCell}>{item[key]}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function IVRHangupsTable (isVisible, closeModal, data, statusName, updateTime) {
  let sortedData;
  if (data.Data[0].hasOwnProperty('TFN') && data.Data[0].hasOwnProperty('TFN Skill')) {
      sortedData = data.Data.slice().sort((a, b) => {
        return a['TFN Skill'].localeCompare(b['TFN Skill']);
    });

  } else {
      sortedData = data.Data.slice().sort((a, b) => {
        return a['TFN'].localeCompare(b['TFN']);
    });
  }

  let startIndex = 2;
  let endIndex = 7;

  if (data.ColumnsLabels.includes('TFN') && data.ColumnsLabels.includes('TFN Skill')) {
      startIndex = 2;
      endIndex = 7;
  } else {
      startIndex = 0;
      endIndex = 7;
  }

  const calculateColumnWidths = () => {
    const widths = {
      'Call Skill': 100,
      'TFN Skill': 100,
      'TFN': 200,
      'End Call Info': 270,
      'Total Calls': 120,
    };

    return widths;
  }; 
  const columnWidths = calculateColumnWidths();

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{statusName}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(startIndex,endIndex).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(startIndex,endIndex).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style={styles.tableCell}>{item[key]}</Text> 
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function UtiltyProductTable (isVisible, closeModal, data, statusName, updateTime) {
    const sortedData = data.Data.slice().sort((a, b) => {
      return a['TFN Skill'].localeCompare(b['TFN Skill']);
    })

    const calculateColumnWidths = () => {
      const widths = {
        'TFN Skill': 100,
        'Call Skill': 100,
        'Provider Name': 280,
        'Sales': 100,
        'Utility Products': 150,
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{statusName}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(2,7).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(2,7).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style={styles.tableCell}>{item[key]}</Text>  
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View> 
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function QualificationsTable (isVisible, closeModal, data, statusName, updateTime) {
    let sortedData;
    if (data.Data[0].hasOwnProperty('TFN')) {
        sortedData = data.Data.slice().sort((a, b) => {
          return a['TFN'].localeCompare(b['TFN']);
      });

    } else {
        sortedData = data.Data.slice().sort((a, b) => {
          return a['TFN Skill'].localeCompare(b['TFN Skill']);
      });
    }


    const calculateColumnWidths = () => {
      const widths = {
        'TFN Skill': 100,
        'Call Skill': 100,
        'TFN': 200,
        'Total Qualification': 200,
        'Unique Qualification': 200,
        'Total Orders': 150,
        'Conversion Rate': 200
      };
  
      return widths;
    }; 

    const columnWidths = calculateColumnWidths();

    let startIndex = 2;
    let endIndex = 10;

    if (data.ColumnsLabels.includes('TFN')) {
        startIndex = 0;
        endIndex = 8;
    } else {
        startIndex = 2;
        endIndex = 8;
    }


    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{statusName}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(startIndex, endIndex).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(startIndex, endIndex).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style={styles.tableCell}>{item[key]}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function AddOnsTable (isVisible, closeModal, data, statusName, updateTime) {
    const sortedData = data.Data.slice().sort((a, b) => {
      return a['TFN Skill'].localeCompare(b['TFN Skill']);
    })

    const calculateColumnWidths = () => {
      const widths = {
        'TFN Skill': 100,
        'Call Skill': 100,
        'Addon': 450,
        'Addon Count': 200,
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{statusName}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(2,6).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(2,6).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style={styles.tableCell}>{item[key]}</Text>   
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function FatalCallsTable (isVisible, closeModal, data, statusName, updateTime, commentLine) {

    const AlertPopup = () => {
        Alert.alert(
          'Information',
          commentLine,
          [
              { text: 'OK'}
          ],
          { cancelable: false }
      );
    };

    let sortedData;
    if (data.Data[0].hasOwnProperty('TFN') && data.Data[0].hasOwnProperty('TFN Skill')) {
        sortedData = data.Data.slice().sort((a, b) => {
          return a['TFN Skill'].localeCompare(b['TFN Skill']);
      });
  
    } else {
        sortedData = data.Data.slice().sort((a, b) => {
          return a['TFN'].localeCompare(b['TFN']);
      });
    }
  
    let startIndex = 2;
    let endIndex = 7;
  
    if (data.ColumnsLabels.includes('TFN') && data.ColumnsLabels.includes('TFN Skill')) {
        startIndex = 2;
        endIndex = 7;
    } else {
        startIndex = 0;
        endIndex = 7;
    }

    const calculateColumnWidths = () => {
      const widths = {
        'Call Skill': 100,
        'TFN Skill': 100,
        'TFN': 200,
        'Disposition': 350,
        'Total Calls': 120,
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <TouchableOpacity onPress={AlertPopup} style={styles.alertContainer}>
              <Text style={styles.modalTitle}>{statusName}</Text>
              <View style={styles.exclamationStyle}>
                {svgIcon.SvgStatsExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(startIndex,endIndex).map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(startIndex, endIndex).map((key, index) => (
                        <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                          <Text style={styles.tableCell}>{item[key]}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function RepeatCallsTable (isVisible, closeModal, data, statusName, updateTime) {
    const sortedData = data.Data.slice().sort((a, b) => {
      return a['Dealer Name'].localeCompare(b['Dealer Name']);
    })

    const calculateColumnWidths = () => {
      const widths = {
        'Dealer Name': 280,
        'TFN': 140,
        'BTN': 140,
        'Total Calls': 120,
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();

    let startIndex = 2;
    let endIndex = 7;
  
    if (data.ColumnsLabels.includes('TFN Skill Name')) {
        startIndex = 1;
        endIndex = 5;
    } else {
        startIndex = 0;
        endIndex = 5;
    }

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{statusName}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
              <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
                <View style={styles.container}>
                  <View style={styles.headerRow}>
                    {data.ColumnsLabels.slice(startIndex, endIndex).map((label, index) => (
                      <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                        <Text style={styles.tableFixedHeader}>{label}</Text>
                      </View>
                    ))}
                  </View>
                  <FlatList
                    data={sortedData}
                    renderItem={({ item , index}) => (
                      <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                        {data.ColumnsLabels.slice(startIndex, endIndex).map((key, index) => (
                          <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                            <Text style={styles.tableCell}>{item[key]}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={styles.closeButtonContainer}>
              <Text style={styles.updateStyle}>{updateTime}</Text>
            </View>
          </View>
      </View>
    </Modal>
  );
  };

export function OutboundCallsTable (isVisible, closeModal, data, statusName, updateTime, commentLine) {
    const sortedData = data.Data.slice().sort((a, b) => {
      return a['Call Skill'].localeCompare(b['Call Skill']);
    })

    const calculateColumnWidths = () => {
      const widths = {
        'Caller ID': 150,
        'Call Skill': 100,
        'Outbound Calls': 180,
        'Outbound RGUs': 180,
      };
  
      return widths;
    }; 
    const columnWidths = calculateColumnWidths();

    const AlertPopup = () => {
      Alert.alert(
        'Information',
        commentLine,
        [
            { text: 'OK'}
        ],
        { cancelable: false }
    );
  };

    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <TouchableOpacity onPress={AlertPopup} style={styles.alertContainer}>
              <Text style={styles.modalTitle}>{statusName}</Text>
              <View style={styles.exclamationStyle}>
                {svgIcon.SvgStatsExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
            </TouchableOpacity>
          </View>
          <View style={{flex:1 }}>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.ColumnsLabels.slice(0,5).map((label, index) => {
                    if (index !== 1) {
                    return(
                      <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                        <Text style={styles.tableFixedHeader}>{label}</Text>
                      </View>
                    );}
                  })}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(0,5).map((key, index) => {
                        if (index !== 1) {
                        return(
                          <View key={index} style={[styles.tableDataRow, { width: columnWidths[key] }]}>
                            <Text style={styles.tableCell}>{item[key]}</Text>  
                          </View>
                        );}
                    })}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View> 
          <View style={styles.closeButtonContainer}>
            <Text style={styles.updateStyle}>{updateTime}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
  };

export function RGUTable (isVisible, closeModal, data_RGU, data_Sales, statusName, activeTab, setActiveTab, updateTime) {
  data_RGU["RGUDetail"]["Total RGUs"] = data_RGU["RGU"];
  data_Sales["SaleDetail"]["Total Sales"] = data_Sales["Sales"];
  const data = data_Sales['ProviderWiseDetail'];

  let sortedData;
  if (data.Data[0].hasOwnProperty('TFN')) {
      sortedData = data.Data.slice().sort((a, b) => {
        return a['TFN'].localeCompare(b['TFN']);
    });

  } else {
      sortedData = data.Data.slice().sort((a, b) => {
        return a['TFN Skill'].localeCompare(b['TFN Skill']);
    });
  }
  
  let startIndex = 2;
  let endIndex = 8;

  if (data.ColumnsLabels.includes('TFN')) {
      startIndex = 0;
      endIndex = 8;
  } else {
      startIndex = 2;
      endIndex = 8;
  }

  const calculateRGUColumnWidths = () => {
    const widths = {
      'RGU': 150,
      'Chat_RGU': 150,
      'Internet': 150,
      'Security': 150,
      'Video': 150,
      'Voice': 150,
      'Wireless': 150,
      'Total RGUs': 200,
    };

    return widths;
  }; 

  const calculateSalesColumnWidths = () => {
    const widths = {
      'DoublePlay': 150,
      'MultiPlay': 150,
      'QuadPlay': 150,
      'SinglePlay': 150,
      'TriplePlay': 150,
      'Total Sales': 150
    };

    return widths;
  }; 

  const calculateProviderColumnWidths = () => {
    const widths = {
      'TFN Skill': 100,
      'TFN': 200,
      'Call Skill': 100,
      'Provider Name': 250,
      'Sales': 100,
      'RGU Count': 150,
    };
    return widths;
  }; 

  const columnRGUWidths = calculateRGUColumnWidths();
  const columnSalesWidths = calculateSalesColumnWidths();
  const columnProviderWidths = calculateProviderColumnWidths();

  const salesDetaildata = Object.entries(data_Sales["SaleDetail"]).map(([key, value]) => ({ key, value })).sort((a, b) => {
    if (a.key === "Total Sales") {
      return -1; 
    } else if (b.key === "Total Sales") {
      return 1;  
    }
  });

  const rguDetaildata = Object.entries(data_RGU["RGUDetail"]).map(([key, value]) => ({ key, value })).sort((a, b) => {
    if (a.key === "Total RGUs") {
      return -1; 
    } else if (b.key === "Total RGUs") {
      return 1;  
    }
  });

  const switchToSalesTab = () => {
    setActiveTab('Sales & RGUs');
  };
  
  const switchToProviderTab = () => {
    setActiveTab('Provider Wise');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <View style={styles.modalTitleContainer}>
          <Text style={styles.modalTitle}>{statusName}</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
            {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabStyle,
              activeTab === 'Sales & RGUs' && styles.activeTabItem,
            ]}
            onPress={switchToSalesTab}
            disabled={activeTab === 'Sales & RGUs'}
          >
            <Text style={[styles.tabText, activeTab === 'Sales & RGUs' && styles.activeTabText]}>Sales & RGUs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabStyle,
              activeTab === 'Provider Wise' && styles.activeTabItem,
            ]}
            onPress={switchToProviderTab}
            disabled={activeTab === 'Provider Wise'}
          >
            <Text style={[styles.tabText, activeTab === 'Provider Wise' && styles.activeTabText]}>Provider Wise</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Sales & RGUs' && (
          <>
          <View style={styles.tabRGUContainer}>
            <View style={styles.salesContainer}>
              <Text style={styles.rguTitle}>Sales</Text>
            </View>         
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={styles.scrollableBorder}>
              <View style={styles.container}>
                <View style={styles.headerRGURow}>
                  {salesDetaildata.map((item, index) => (
                    <View key={index} style={[styles.columnRGUHeader, { width: columnSalesWidths[item.key] }]}>
                      <Text style={styles.tableFixedHeader}>{item.key}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.dataRGURow}>
                  {salesDetaildata.map((item, index) => (
                    <View key={index} style={[styles.tableRGURow, { width: columnSalesWidths[item.key] }]}>
                      <Text style={styles.tableRGUCell}>{item.value}</Text>
                    </View>
                  ))}                   
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.tabRGUContainer}>
            <View style={styles.rguContainer}>
              <Text style={styles.rguTitle}>RGU</Text>
            </View>       
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false} style={styles.scrollableBorder}>
              <View style={styles.container}>
                <View style={styles.headerRGURow}>
                  {rguDetaildata.map((item, index) => (
                    <View key={index} style={[styles.columnRGUHeader, { width: columnRGUWidths[item.key] }]}>
                      <Text style={styles.tableFixedHeader}>{item.key}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.dataRGURow}>
                  {rguDetaildata.map((item, index) => (
                    <View style={[styles.tableRGURow, { width: columnRGUWidths[item.key] }]}>
                      <Text style={styles.tableRGUCell}>{item.value}</Text>
                    </View>
                  ))}                   
                </View>
              </View>
            </ScrollView>
          </View>
          </>
        )}
        {activeTab === 'Provider Wise' && (
          <View style={styles.tabRGUContainer}>
            <View style={styles.salesContainer}>
              <Text style={styles.rguTitle}>Provider Wise</Text>
            </View> 
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={false}  style={styles.scrollableBorder}>
              <View style={styles.container}>
                <View style={styles.headerRGURow}>
                  {data.ColumnsLabels.slice(startIndex, endIndex).map((label, index) => {
                    return(
                      <View key={index} style={[styles.columnRGUHeader, { width: columnProviderWidths[label] }]}>
                        <Text style={styles.tableFixedHeader}>{label}</Text>
                      </View>
                    )
                  })}
                </View>
                <FlatList
                  data={sortedData}
                  renderItem={({ item , index}) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 1 ? styles.backColor.active : null }]}>
                      {data.ColumnsLabels.slice(startIndex, endIndex).map((key, index) => {
                        return(
                          <View key={index} style={[styles.tableDataRow, { width: columnProviderWidths[key]}]}>
                            <Text style={styles.tableCell}>{item[key]}</Text>                          
                          </View>
                        )
                    })}
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </View> 
        )}
        <View style={styles.closeButtonContainer}>
          <Text style={styles.updateStyle}>{updateTime}</Text>
        </View>
      </View>
    </View>
  </Modal>
);
};