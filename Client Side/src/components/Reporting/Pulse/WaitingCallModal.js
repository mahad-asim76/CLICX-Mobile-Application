import React from 'react';
import { Modal, View, Text, TouchableOpacity,TouchableWithoutFeedback, FlatList } from 'react-native';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/WaitingCallStyles.js';

const WaitingCallModal = ({ isVisible, closeModal, data, updateTime }) => {
  return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>Waiting Calls</Text>
                  <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
                    {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
                  </TouchableOpacity>
                </View>        
                {data === null || data.length === 0? (
                  <View style={styles.emptyDataRow}>
                    {svgIcon.SvgNoData({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
                  </View>
                  ) : (
                  <>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableHeader}>Wait Time</Text>
                      <Text style={styles.tableHeader}>Skill</Text>
                      <Text style={styles.tableHeader}>TFN</Text>
                      <Text style={styles.tableHeader}>Call Stage</Text>
                      <Text style={styles.tableHeader}>Source</Text> 
                    </View>
                    <TouchableWithoutFeedback>
                      <FlatList
                        data={data}
                        keyExtractor={(item) => item.AGENTID}
                        renderItem={({ item, index }) => (
                          <View key={item.AGENTID} style={[styles.tableDataRow,{backgroundColor: index % 2 === 0 ? styles.backColor.active : null}]}>
                            <Text style={styles.tableCell}>{item.WaitTime}</Text>
                            <Text style={styles.tableCell}>{item.skill}</Text>
                            <Text style={styles.tableCell}>{item.TFN}</Text>
                            <Text style={styles.tableCell}>{item.call_location}</Text>
                            <Text style={styles.tableCell}>{item.Source}</Text>
                          </View>
                        )}
                      />
                    </TouchableWithoutFeedback>
                  </>
                )}   
                <View style={styles.closeButtonContainer}>
                  <Text style={styles.updateStyle}>{updateTime}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
};
export default WaitingCallModal;
