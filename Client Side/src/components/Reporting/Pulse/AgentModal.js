import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/AgentModalStyles.js';
import * as Constant from '../../../Common/Constants.js';
import * as Animatable from 'react-native-animatable';

const AgentModal = ({ isVisible, closeModal, data, statusName, updateTime, thresholdValue, collectiveThresholdValue}) => {
  let thresholdvalue;
  return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <View>
                <Text style={styles.modalTitle}>{statusName}</Text>
                {(thresholdValue != Constant.ThresholdDuration ? (
                  <Text style={styles.thresholdTitle}>Threshold Value: {thresholdValue}</Text>
                ):'')}               
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
                {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
              </TouchableOpacity>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Agent</Text>
              <Text style={styles.tableHeader}>Campaign</Text>
              <Text style={styles.tableHeader}>Skill</Text>
              <Text style={styles.tableHeader}>Duration</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.AGENTID}
              renderItem={({ item, index }) => {
                for (let skillName in collectiveThresholdValue) {
                  if (skillName.includes(item.SKILL.replace('Skill', ''))) {
                    thresholdvalue = collectiveThresholdValue[skillName];
                  }
                }
              return(
                <Animatable.View
                    key={item.AGENTID}
                    animation={thresholdvalue != Constant.ThresholdDuration  ? ( item.DURATION > thresholdvalue ? 'pulse' : ''): ''}
                    iterationCount="infinite"
                    iterationDelay={5000}
                    style={[styles.tableDataRow,
                      {backgroundColor: index % 2 === 0 ? styles.backColor.active : null},
                      thresholdvalue != Constant.ThresholdDuration  ? (
                        item.DURATION > thresholdvalue
                        ? { backgroundColor: styles.thresColor.active } 
                        : {} 
                      ):({})
                    ]}
                  >
                  <Text style={[styles.tableCell,
                      thresholdvalue != Constant.ThresholdDuration ? (
                        item.DURATION > thresholdvalue
                        ? { color: styles.thresholdTitle.color } 
                        : {} 
                      ):({})
                    ]}>
                      {item.AGENTID}</Text>
                  <Text style={[styles.tableCell, 
                    thresholdvalue != Constant.ThresholdDuration ? (
                      item.DURATION > thresholdvalue
                        ? { color: styles.thresholdTitle.color } 
                        : {} 
                      ):({})  , styles.campaignCell]}>{item.CAMPAIGN.replace('DGS', 'DGS ')}</Text>
                  <Text style={[styles.tableCell,
                      thresholdvalue != Constant.ThresholdDuration  ? (
                        item.DURATION > thresholdvalue
                          ? { color: styles.thresholdTitle.color } 
                          : {} 
                        ):({}) 
                    ]}>{item.SKILL.replace('Skill', '')}</Text>
                  <Text style={[styles.tableCell,
                      thresholdvalue != Constant.ThresholdDuration  ? (
                        item.DURATION > thresholdvalue
                          ? { color: styles.thresholdTitle.color } 
                          : {} 
                        ):({}) 
                    ]}>{item.DURATION}</Text>
                </Animatable.View>
              );
            }}
            />
            <View style={styles.closeButtonContainer}>
              <Text style={styles.updateStyle}>{updateTime}</Text>
            </View>
          </View>
        </View>
      </Modal>
  );
};
export default AgentModal;
