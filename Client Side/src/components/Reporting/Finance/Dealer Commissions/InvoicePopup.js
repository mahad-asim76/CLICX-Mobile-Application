import React, {useState} from 'react';
import { Modal, View, ScrollView, TouchableOpacity, Text, FlatList} from 'react-native';
import * as svgIcon from '../../../../../Themes/SVG Icons/svgPulseComponent';
import styles from '../../../../../Themes/Default Theme/Reporting/Finances/Dealer Commissions/InvoicePopupStyle.js';

  export function NetCommission_Popup (isVisible, toggleModal, data, statusName) {

    function formatAmount(amount) {
        amount = parseFloat(amount);
        if (isNaN(amount)) {
            return "0";
        }
        if (Math.round(amount * 100) / 100 === 0) {
          return Math.trunc(amount); 
        } else {
          if (amount >= 1000) {
              return amount.toLocaleString('en-US', {maximumFractionDigits: 3});
          } else {
              return amount.toFixed(2).replace(/\.?0*$/, '');
          }
        }
    }

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.invoiceBackground}>
          <View style={styles.invoiceMainContainer}>
            <View style={styles.invoiceTitleContainer}>
              <Text style={styles.modalTitle}>{statusName}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <View style={styles.invoiceDealerContainer}>
              <View style={styles.contentContainer}>
                <View style={styles.invoiceDoubleTopTouchablesContainer}>
                  <View style={styles.invoiceFirsttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>Equity</Text>
                  </View>
                  <View style={styles.invoiceLasttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>Amount</Text>
                  </View>
                </View>
                <View style={styles.invoiceSingleTopTouchablesContainer}>
                  <View style={styles.invoiceTextContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>Last Commissions</Text>
                  </View>              
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.invoiceDoubleTouchablesContainer}>
                  <View style={styles.invoiceFirsttouchableContainer}>
                    <Text style={styles.invoiceDealerleftTitle}>Default Commission</Text>
                  </View>
                  <View style={styles.invoiceLasttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.DefaultCommission.TotalAmount)}</Text>
                  </View>
                </View>
                <View style={styles.invoiceSingleTouchablesContainer}>
                  <View style={styles.invoiceTextContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.PreviousInvoice.DefaultCommission.TotalAmount)}</Text>
                  </View>              
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.invoiceDoubleTouchablesContainer}>
                  <View style={styles.invoiceFirsttouchableContainer}>
                    <Text style={styles.invoiceDealerleftTitle}>Other Commission</Text>
                  </View>
                  <View style={styles.invoiceLasttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.OthersCommission.TotalAmount)}</Text>
                  </View>
                </View>
                <View style={styles.invoiceSingleTouchablesContainer}>
                  <View style={styles.invoiceTextContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.PreviousInvoice.OthersCommission.TotalAmount)}</Text>
                  </View>              
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.invoiceDoubleTouchablesContainer}>
                  <View style={styles.invoiceFirsttouchableContainer}>
                    <Text style={styles.invoiceDealerleftTitle}>Platform Commission</Text>
                  </View>
                  <View style={styles.invoiceLasttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.PlatformCharges.TotalAmount)}</Text>
                  </View>
                </View>
                <View style={styles.invoiceSingleTouchablesContainer}>
                  <View style={styles.invoiceTextContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.PreviousInvoice.PlatformCharges.TotalAmount)}</Text>
                  </View>              
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.invoiceDoubleTouchablesContainer}>
                  <View style={styles.invoiceFirsttouchableContainer}>
                    <Text style={styles.invoiceDealerleftTitle}>ChargeBacks</Text>
                  </View>
                  <View style={styles.invoiceLasttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.ChargeBack.TotalAmount)}</Text>
                  </View>
                </View>
                <View style={styles.invoiceSingleTouchablesContainer}>
                  <View style={styles.invoiceTextContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.PreviousInvoice.ChargeBack.TotalAmount)}</Text>
                  </View>              
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.invoiceDoubleLastTouchablesContainer}>
                  <View style={styles.invoiceFirsttouchableContainer}>
                    <Text style={styles.invoiceDealerleftTitle}>Dealer Net Commission</Text>
                  </View>
                  <View style={styles.invoiceLasttouchableContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.NetCommission.TotalAmount)}</Text>
                  </View>
                </View>
                <View style={styles.invoiceSingleLastTouchablesContainer}>
                  <View style={styles.invoiceTextContainer}>
                    <Text style={styles.invoiceDealerRightTitle}>${formatAmount(data.PreviousInvoice.NetCommission.TotalAmount)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  export function DefaultCommission_Popup (isVisible, toggleModal, data) { 
    const calculateColumnWidths = (labels) => {
      const widths = {
        'Provider': 180,
        'PackageInfo': 300,
        'Total Commission': 300,
        'Paid Commission': 300,
        'Payable Commission': 300,
        'Hold Disputed Commission': 330,
        'Hold Disputed RGU': 330,
        'Chargeback Commission': 330,
        'Chargeback RGU': 330,
        'Payable Bonus': 250,
        'Paid Bonus': 250,
        'Video RGU': 250,
        'Internet RGU': 250,
        'Voice RGU': 250,
        'Wireless RGU': 250,
        'Security RGU': 250,
        'Video Commission': 300,
        'Internet Commission': 300,
        'Voice Commission': 300,
        'Security Commission': 300,
        'Wireless Commission': 300,
      };
    
      labels.forEach(label => {
        if (label.includes('Hold Disputed Commission') || label.includes('Hold Disputed RGU') || label.includes('Chargeback Commission') || label.includes('Chargeback RGU')) {
          widths[label] = 330;
        } else if (label.includes('Total Commission') || label.includes('Paid Commission') || label.includes('Payable Commission')) {
          widths[label] = 300; 
        }
        else if (label.includes('Video RGU') || label.includes('Payable Bonus') || label.includes('Paid Bonus') || label.includes('Voice RGU') || label.includes('Internet RGU') || label.includes('Security RGU') || label.includes('Wireless RGU')) {
          widths[label] = 250; 
        }
        else if (label.includes('Video Commission') || label.includes('Voice Commission')|| label.includes('Internet Commission') || label.includes('Security Commission') || label.includes('Wireless Commission')) {
          widths[label] = 300; 
        }
      });
    
      return widths;
    };
    const columnWidths = calculateColumnWidths(data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].ColumnsList);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.invoiceBackground}>
          <View style={styles.invoicePopUpontainer}>
            <View style={styles.invoiceTitleContainer}>
              <Text style={styles.modalTitle}>{data.HeaderValues.split(',')[0]}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].ColumnsList.map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View> 
                <FlatList
                  data={data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].Data}
                  style={{flex:1}}
                  renderItem={({ item, index }) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? 'rgba(169, 216, 139, 0.3)' : 'rgba(169, 216, 139, 0.7)' }]}>
                      {data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].ColumnsLabels.map((key, columnIndex) => (
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
        </View>
      </Modal>
    );

  };

  export function OthersCommission_Popup (isVisible, toggleModal, data) {
    const calculateColumnWidths = (labels) => {
      const widths = {
        'Leads': 80,
        'Rate Per Lead': 230,
        'Total Commission': 270,
        'Paid Commission': 270,
        'Payable Commission': 270,
      };
    
      labels.forEach(label => {
        if (label.includes('Rate Per Lead')) {
          widths[label] = 230;
        } else if (label.includes('Total Commission') || label.includes('Paid Commission') || label.includes('Payable Commission')) {
          widths[label] = 270; 
        }
      });
    
      return widths;
    };
    const columnWidths = calculateColumnWidths(data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].ColumnsList);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.invoiceBackground}>
          <View style={styles.invoicePopUpontainer}>
            <View style={styles.invoiceTitleContainer}>
              <Text style={styles.modalTitle}>{data.DetailHeaderName}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].ColumnsList.map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View> 
                <FlatList
                  data={data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].Data}
                  style={{flex:1}}
                  renderItem={({ item, index }) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? 'rgba(169, 216, 139, 0.3)' : 'rgba(169, 216, 139, 0.7)' }]}>
                      {data.Invoice_Detail_Object.Invoice_DetailTabularStats[1].ColumnsLabels.map((key, columnIndex) => (
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
        </View>
      </Modal>
    );

  };

  export function OnHold_Popup (isVisible, toggleModal, data) {
    const calculateColumnWidths = (labels) => {
      const widths = {
        'Provider': 180,
        'Commission OnHold': 300,
        'Bonus OnHold': 220,
        'Video RGU': 170,
        'Internet RGU': 170,
        'Voice RGU': 170,
        'Security RGU': 170,
        'Wireless RGU': 170,
      };
    
      labels.forEach(label => {
        if (label.includes('Commission OnHold')) {
          widths[label] = 300;
        } else if (label.includes('Bonus OnHold') ) {
          widths[label] = 220; 
        } else if (label.includes('Video RGU') || label.includes('Voice RGU')|| label.includes('Internet RGU') || label.includes('Security RGU') || label.includes('Wireless RGU')) {
          widths[label] = 170; 
        }
      });
    
      return widths;
    };
    const columnWidths = calculateColumnWidths(data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].ColumnsList);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.invoiceBackground}>
          <View style={styles.invoicePopUpontainer}>
            <View style={styles.invoiceTitleContainer}>
              <Text style={styles.modalTitle}>{data.DetailHeaderName}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].ColumnsList.map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View> 
                <FlatList
                  data={data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].Data}
                  style={{flex:1}}
                  renderItem={({ item, index }) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? 'rgba(169, 216, 139, 0.3)' : 'rgba(169, 216, 139, 0.7)' }]}>
                      {data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].ColumnsLabels.map((key, columnIndex) => (
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
        </View>
      </Modal>
    );

  };

  export function ChargeBack_Popup (isVisible, toggleModal, data) {
    const calculateColumnWidths = (labels) => {
      const widths = {
        'Provider': 180,
        'Chargeback Commission': 360,
        'Chargeback-Processed Comm': 360,
        'Chargeback-Processed RGU': 360,
        'Bonus Chargeback': 300,
        'Bonus Chargeback-Proc': 300,
        'Video RGU': 170,
        'Internet RGU': 170,
        'Voice RGU': 170,
        'Security RGU': 170,
        'Wireless RGU': 170,
      };
    
      labels.forEach(label => {
        if (label.includes('Chargeback Commission') || label.includes('Chargeback-Processed Comm') || label.includes('Chargeback-Processed RGU')) {
          widths[label] = 360;
        } else if (label.includes('Bonus Chargeback') || label.includes('Bonus Chargeback-Proc')) {
          widths[label] = 300; 
        } else if (label.includes('Video RGU') || label.includes('Voice RGU')|| label.includes('Internet RGU') || label.includes('Security RGU') || label.includes('Wireless RGU')) {
          widths[label] = 170; 
        }
      });
    
      return widths;
    };
    const columnWidths = calculateColumnWidths(data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].ColumnsList);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.invoiceBackground}>
          <View style={styles.invoicePopUpontainer}>
            <View style={styles.invoiceTitleContainer}>
              <Text style={styles.modalTitle}>{data.DetailHeaderName}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} vertical={false} showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true} style={{flex:1 }}>
              <View style={styles.container}>
                <View style={styles.headerRow}>
                  {data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].ColumnsList.map((label, index) => (
                    <View key={index} style={[styles.columnHeader, { width: columnWidths[label] }]}>
                      <Text style={styles.tableFixedHeader}>{label}</Text>
                    </View>
                  ))}
                </View> 
                <FlatList
                  data={data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].Data}
                  style={{flex:1}}
                  renderItem={({ item, index }) => (
                    <View style={[styles.dataRow, { backgroundColor: index % 2 === 0 ? 'rgba(169, 216, 139, 0.3)' : 'rgba(169, 216, 139, 0.7)' }]}>
                      {data.Invoice_Detail_Object.Invoice_DetailTabularStats[0].ColumnsLabels.map((key, columnIndex) => (
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
        </View>
      </Modal>
    );

  };
