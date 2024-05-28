import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import * as Constants from '../../../Common/Constants';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/AgentNotificationStyle.js';

const AgentNotificationModal = ({ isVisible, closeModal, data, updateTime }) => {

  const { AgentLogIn, AgentLogout } = data ?? { AgentLogIn: [], AgentLogout: [] };
  const combinedData = [...AgentLogIn, ...AgentLogout];
  
  const renderItem = ({ item }) => (
    <View
      style={[ styles.agentStyle, {
        backgroundColor: item.Status === Constants.AgentStatus.Login ? styles.backColor.active : styles.backColor.inactive,
        borderColor: item.Status === Constants.AgentStatus.Login ? styles.borderColor.active  : styles.borderColor.inactive,
      }]}>
      <Text style={[styles.agentText, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}>Agent ID: 
      <Text style={[styles.agentTextTitle, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}> {item.AgentID}</Text></Text>
      <Text style={[styles.agentText, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}>Agent Name: 
      <Text style={[styles.agentTextTitle, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}> {item.AgentName}</Text></Text>
      <Text style={[styles.agentText, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}>Location: 
      <Text style={[styles.agentTextTitle, {color: item.Status === Constants.AgentStatus.Login? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}> {item.LOCATION}</Text></Text>
      <Text style={[styles.agentText, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}>Skill: 
      <Text style={[styles.agentTextTitle, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}> {item.SKILL.replace('Skill', '')}</Text></Text>
      <Text style={[styles.agentText, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}>Status: 
      <Text style={[styles.agentTextTitle, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}> {item.Status}</Text></Text>
      <Text style={[styles.agentText, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}>Time: 
      <Text style={[styles.agentTextTitle, {color: item.Status === Constants.AgentStatus.Login ? styles.defaultLoginColor.color:styles.defaultLogoutColor.color}]}> {item.TIME}</Text></Text>
    </View>
  );
 
  return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Agent Notifications</Text>
                <TouchableOpacity onPress={closeModal} style={styles.closeStyle}>
                  {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
                </TouchableOpacity>
              </View>        
              {data === null || data.length === 0? (
                <View style={styles.emptyDataRow}>
                  {svgIcon.SvgNoData({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
                </View>
                ) : (
                <FlatList
                  data={combinedData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
                
              )}   
              <View style={styles.closeButtonContainer}>
                <Text style={styles.updateStyle}>{updateTime}</Text>
              </View>
            </View>
        </View>
      </Modal>
  );
};
export default AgentNotificationModal;
