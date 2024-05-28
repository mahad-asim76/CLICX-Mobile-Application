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
                      <Text style={styles.tableHeader}>BTN</Text>
                      <Text style={styles.tableHeader}>Wait Time</Text>
                      <Text style={styles.tableHeader}>Skill</Text>
                      <Text style={styles.tableHeader}>TFN Server IP</Text>
                      {/* Uncomment the lines below if needed */}
                      {/* <Text style={styles.tableHeader}>Forwarder ID</Text>
                        <Text style={styles.tableHeader}>Call Stage</Text>
                        <Text style={styles.tableHeader}>Source</Text> */}
                    </View>
                    <TouchableWithoutFeedback>
                      <FlatList
                        data={data}
                        keyExtractor={(item) => item.AGENTID}
                        renderItem={({ item }) => (
                          <View key={item.AGENTID} style={styles.tableDataRow}>
                            <Text style={styles.tableCell}>{item.AGENTID}</Text>
                            <Text style={[styles.tableCell, styles.campaignCell]}>{item.CAMPAIGN.replace('DGS', 'DGS ')}</Text>
                            <Text style={styles.tableCell}>{item.SKILL.replace('Skill', '')}</Text>
                            <Text style={styles.tableCell}>{item.DURATION}</Text>
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
