import React, { useState , useEffect, useRef} from 'react';
import { ScrollView,View, FlatList, Text, Modal, Image, TouchableWithoutFeedback,TouchableOpacity, Platform, Dimensions, TouchableHighlight} from 'react-native';
import axios from 'axios';
import LZString from 'lz-string'
import AgentModal from './AgentModal.js';
import * as Constants from '../../../Common/Constants.js';
import * as ClicxMethods from '../../../ClientService/SupportMethods.js';
import DropdownModal from './DropdownModal.js';
import { checkAuthToken } from '../../Common Functions/AuthComponent';
import transparentLoadingGif from '../../../../assets/loading_animation.gif';
import ServiceClient from '../../../ClientService/ClientAPI.js';
import { useNavigation } from '@react-navigation/native';
import DataTable from './DataTable.js';
import * as modalData from './PulseDataModal';
import * as svgIcon from '../../../../Themes/SVG Icons/svgPulseComponent.js';
import * as SvgIcon from '../../../../Themes/SVG Icons/svgCommonComponent.js';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/PulseStyles';
import WaitingCallModal from './WaitingCallModal.js';
import AgentNotificationModal from './AgentNotificationModal';
import * as Animatable from 'react-native-animatable';

const MainScreen =  () => {
  const navigation = useNavigation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState();
  const [campaignFilterData, setCampaignFilterData] = useState([]);
  const [combineCount, setCombineCount] = useState(0);
  const [skillData, setSkillData] = useState([]);
  const [updateTime, setUpdateTime] = useState([]);
  const [location, setLocation] = useState([]);
  const [agentInfoStats, setAgentInfoStats] = useState([]);
  const [summaryCallsStats, setSummaryCallsStats] = useState([]);
  const [summarySalesStats, setSummarySalesStats] = useState([]);
  const [SkillStats, setSkillStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isBusyModalVisible, setBusyModalVisible] = useState(false);
  const [isWaitModalVisible, setWaitModalVisible] = useState(false);
  const [isOnWrapModalVisible, setOnWrapModalVisible] = useState(false);
  const [isBreakModalVisible, setBreakModalVisible] = useState(false);
  const [isTrainingModalVisible, setTrainingModalVisible] = useState(false);
  const [isCoachingModalVisible, setCoachingModalVisible] = useState(false);
  const [showRowMainContainer, setShowRowMainContainer] = useState(true);
  const [isInitiatedModalVisible, setInitiatedModalVisible] = useState(false);
  const [isAnsweredModalVisible, setAnsweredModalVisible] = useState(false);
  const [isAbandonedModalVisible, setAbandonedModalVisible] = useState(false);
  const [isShortAbandonedModalVisible, setShortAbandonedModalVisible] = useState(false);
  const [isIVRModalVisible, setIVRModalVisible] = useState(false);
  const [isUtilityModalVisible, setUtilityModalVisible] = useState(false);
  const [isRGUModalVisible, setRGUModalVisible] = useState(false);
  const [isQualificationModalVisible, setQualificationModalVisible] = useState(false);
  const [isAddOnsModalVisible, setAddOnsModalVisible] = useState(false);
  const [isOptinsModalVisible, setOptinsModalVisible] = useState(false);
  const [isFatalModalVisible, setFatalModalVisible] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [isOutboundModalVisible, setOutboundModalVisible] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(false);
  const [showTimeContainer, setShowTimeContainer] = useState(true);
  const [isDropdownModalVisible, setDropdownModalVisible] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showWaitingCall, setShowWaitingCall] = useState(false);
  const [showNotificationLogs, setShowNotificationLogs] = useState(false);
  const [isCalendarVisible, setShowCalendarVisible] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedCenter, setSelectedCenter] = useState('DEFAULT');
  const [activeTab, setActiveTab] = useState(Constants.PulseTab.Summary);
  const [activeRGUTab, setActiveRGUTab] = useState('Sales & RGUs');
  const [selectedFeed, setSelectedFeed] = useState(false);
  const [postResponse, setPostResponse] = useState(false);
  const [userItemColor, setUserItemColor] = useState({ color: '#ffffff'});
  const [locationItemColor, setLocationItemColor] = useState({ color: '#ffffff'});
  const [selectedTimeRange, setSelectedTimeRange] = useState("12:00 AM - 11:59 PM")
  const [selectedTimeValue, setSelectedTimeValue] = useState(23);
  const [hasDeactivated, setHasDeactivated] = useState(false);
  const [agentData, setAgentData] = useState([]);
  const autoRefreshEnabledRef = useRef(true);
  const serviceClient = new ServiceClient();

  const toggleLoginModal = () => setLoginModalVisible(!isLoginModalVisible);
  const toggleBusyModal = () => setBusyModalVisible(!isBusyModalVisible);
  const toggleWaitModal = () => setWaitModalVisible(!isWaitModalVisible);
  const toggleOnWrapModal = () => setOnWrapModalVisible(!isOnWrapModalVisible);
  const toggleBreakModal = () => setBreakModalVisible(!isBreakModalVisible);
  const toggleTrainingModal = () => setTrainingModalVisible(!isTrainingModalVisible);
  const toggleCoachingModal = () => setCoachingModalVisible(!isCoachingModalVisible);
  const toggleInitiatedModal = () => setInitiatedModalVisible(!isInitiatedModalVisible);
  const toggleAnsweredModal = () => setAnsweredModalVisible(!isAnsweredModalVisible);
  const toggleAbandonedModal = () => setAbandonedModalVisible(!isAbandonedModalVisible);
  const toggleShortAbandonedModal = () => setShortAbandonedModalVisible(!isShortAbandonedModalVisible);
  const toggleIVRModal = () => setIVRModalVisible(!isIVRModalVisible);
  const toggleUtilityModal = () => setUtilityModalVisible(!isUtilityModalVisible);
  const toggleRGUModal = () => setRGUModalVisible(!isRGUModalVisible);
  const toggleQualificationModal = () => setQualificationModalVisible(!isQualificationModalVisible);
  const toggleAddOnsModal = () => setAddOnsModalVisible(!isAddOnsModalVisible);
  const toggleFatalModal = () => setFatalModalVisible(!isFatalModalVisible);
  const toggleRepeatModal = () => setRepeatModalVisible(!isRepeatModalVisible);
  const toggleOptinsModal = () => setOptinsModalVisible(!isOptinsModalVisible);
  const toggleOutboundModal = () => setOutboundModalVisible(!isOutboundModalVisible);
  const toggleCalendarModal = () => setShowCalendarVisible(!isCalendarVisible);

  const collectiveThresholdLoginValue = {};
  const collectiveThresholdBusyValue = {};
  const collectiveThresholdBreakValue = {};
  const collectiveThresholdWrapValue = {};
  const collectiveThresholdWaitValue = {};
  const collectiveThresholdTrainingValue = {};
  const collectiveThresholdCoachingValue = {};
  const TotalLoginThreshold = {};
  const BusyThreshold = {};
  const BreakThreshold = {};
  const WrapThreshold = {};
  const WaitThreshold = {};
  const TrainingThreshold = {};
  const CoachingThreshold = {};

  let isBelowTotalLoginThreshold = false;
  let isBelowBusyThreshold = false;
  let isBelowOnBreakThreshold = false;
  let isBelowOnWrapThreshold = false;
  let isBelowWaitThreshold = false;
  let isBelowCoachingThreshold = false;
  let isBelowTrainingThreshold = false;
  let cancelTokenSource; 

  const switchToSummaryTab = () => {
    setActiveTab(Constants.PulseTab.Summary);
  };
  
  const switchToHourlySkillsTab = () => {
    setActiveTab(Constants.PulseTab.HourlySkills);
  };

  const toggleLocationModal = () => {
    setShowLocationModal(!showLocationModal);
    setUserItemColor({ color: showLocationModal ? '#ffffff' : '#fcbd39' });
  };

  const toggleCallingModal = () => {
    setShowWaitingCall(!showWaitingCall);
  };

  const toggleNotificationModal = () => {
      setShowNotificationLogs(!showNotificationLogs);
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
    setLocationItemColor({ color: showUserModal ? '#ffffff' : '#fcbd39' });
  };

  const toggleDurationModal = () => {
    setShowDurationModal(!showDurationModal);
  };

  const handleDropdownSelection = (country) => {
    setSelectedCountry(country);
    toggleLocationModal();
    makeAxiosRequest(country, selectedFeed, selectedCenter, selectedTimeValue, selectedDropdownOption);
  };
  
  const handleDropdownUserSelection = (center) => {
    setSelectedCenter(center);
    toggleUserModal();
    makeAxiosRequest(selectedCountry, selectedFeed, center, selectedTimeValue, selectedDropdownOption);
  };

  const handleTimeRangePress = (timeValue, timeRange) => {
    setSelectedTimeRange(timeRange);
    toggleCalendarModal();
    setSelectedTimeValue(timeValue);
    makeAxiosRequest(selectedCountry, selectedFeed, selectedCenter, timeValue)
  }

  const handleDropdownFeedSelection = (feed) => {
    if (feed === true) {
      setShowTimeContainer(false);
      setSelectedFeed(true);
    } else {
      setShowTimeContainer(true);
      setSelectedFeed(false);
    }
    toggleDurationModal();
    makeAxiosRequest(selectedCountry, feed, selectedCenter, selectedTimeValue, selectedDropdownOption);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const renderTimeRangeItem = ({ item, index }) => (
    <TouchableHighlight
      onPress={() => handleTimeRangePress(index, item)}
      disabled={selectedTimeRange === item}
      underlayColor="Transparent"
      style={[
        styles.dropdownCalendarItem,
        selectedTimeRange === item && styles.activeDropdownItem,
      ]}
    >
      <Text style={[styles.dropdownTimeText, selectedTimeRange === item && styles.activeDropdownCalendarText]}>{item}</Text>
    </TouchableHighlight>
  );

  const handleDropdownSelect = (option) => {
    setSelectedDropdownOption(option);
    toggleDropdown();
    makeAxiosRequest(selectedCountry, selectedFeed, selectedCenter, selectedTimeValue, option);
  };

  const toggleDropdownModal = () => {
    setDropdownModalVisible(!isDropdownModalVisible);
  };

  useEffect(() => {
    if(autoRefreshEnabledRef.current){   
      makeInitialRequest();
    }
  }, []); 

  const makeInitialRequest = async () => {
    const country = selectedCountry;
    const feed = selectedFeed;
    const center = selectedCenter;
    const hour = Constants.PulseParams.DefaultHour;
    const skillName = Constants.PulseParams.DefaultSkill;
    await makeAxiosRequest(country, feed, center, hour, skillName);
  };

  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        const response = await serviceClient.getDataAsync(Constants.Reporting, Constants.AgentLogs, await ClicxMethods.tokenParam())
        const jsonData = JSON.parse(LZString.decompressFromBase64(response.value.data));
        setAgentData(jsonData);
        const combinedCount = jsonData.AgentLogIn.length + jsonData.AgentLogout.length;
        setCombineCount(combinedCount);
        setTimeout(() => {
          setAgentData(null);
          setCombineCount(0);
        }, 50000);
      } catch (error) {
        setIsLoading(false);
      }
    };
    const autoRefresh = () => {
      fetchNotificationsData();
      setTimeout(autoRefresh, 100000);
    };
    fetchNotificationsData();
    autoRefresh();
  }, []);


  const timeRanges = [
    "12:00 AM - 12:59 AM", "12:00 AM - 01:59 AM", "12:00 AM - 02:59 AM", "12:00 AM - 03:59 AM",
    "12:00 AM - 04:59 AM", "12:00 AM - 05:59 AM", "12:00 AM - 06:59 AM", "12:00 AM - 07:59 AM",
    "12:00 AM - 08:59 AM", "12:00 AM - 09:59 AM", "12:00 AM - 10:59 AM", "12:00 AM - 11:59 AM",   
    "12:00 AM - 12:59 PM", "12:00 AM - 01:59 PM", "12:00 AM - 02:59 PM", "12:00 AM - 03:59 PM",     
    "12:00 AM - 04:59 PM", "12:00 AM - 05:59 PM", "12:00 AM - 06:59 PM", "12:00 AM - 07:59 PM", 
    "12:00 AM - 08:59 PM", "12:00 AM - 09:59 PM", "12:00 AM - 10:59 PM", "12:00 AM - 11:59 PM",  
  ];

  const makeAxiosRequest = async (country, feed, center, hour, Skill_Name) => {
    setPostResponse(true);
    setIsLoading(true);
    autoRefreshEnabledRef.current = false;
    if (cancelTokenSource) {
      cancelTokenSource.cancel(Constants.CancelRequest);
    }
    cancelTokenSource = axios.CancelToken.source();
    const requestData = await ClicxMethods.pulseParams(country, feed, center, hour, Skill_Name)
    if (requestData.View === Constants.PulseCenter.Core || requestData.View === Constants.PulseCenter.Dealers || requestData.Duration === true) {
      setShowRowMainContainer(false);
    } else {
      setShowRowMainContainer(true);
    }
    latestRequestData = requestData;
    await postRequest(requestData);
  };


  const postRequest = async (requestData) => {
    if (!requestData) {
      return;
    } 
    const response = await serviceClient.getDataAsync(Constants.Reporting,Constants.Pulse_DashboardData,requestData)
    try{
      const data = response.value.data;
      const pulseData = LZString.decompressFromBase64(data);
      const json_data = JSON.parse(pulseData);
      const CampaignData = json_data.Campaigns;
      var index = CampaignData.indexOf(latestRequestData.Skillname);
      if (CampaignData.length > 0) {
        setSelectedDropdownOption(CampaignData[index] || CampaignData[0]);
      }
      setCampaignFilterData(CampaignData);
      const skill_data = json_data.SkillBoards;
      setSkillData(skill_data);
      setAgentInfoStats(skill_data[0].AgentInfo);
      setSummaryCallsStats(skill_data[0].SummaryStats.Calls_Details);
      setSummarySalesStats(skill_data[0].SummaryStats.Sales_Details);
      setSkillStats(skill_data[0].SkillStats);
      setLocation(json_data.Locations);
      setUpdateTime(json_data.LastUpdateTime);
    }
    catch{(error)=>{
      console.error(error);
    }}
    finally{
      setTimeout(async () => {
        setIsLoading(false);
      }, 5000)
      if(!latestRequestData.Duration){
        setTimeout(async () => {
          await postRequest(latestRequestData);
        }, 50000)
      }
    }
  }

  if(isLoading){
    return (
      <View style={styles.loadingOverlay}>
        <Image source={transparentLoadingGif} style={styles.loadingGif} />
      </View>
    )
  }

  const RenderModelFunction = (status, VisbleModelType, ToggleType, Data, updateTime, ThresholdValue, collectiveValue) => {
    return(
      <AgentModal
        statusName={status}
        isVisible={VisbleModelType}
        closeModal={ToggleType}
        data={Data}
        updateTime = {updateTime}
        thresholdValue={ThresholdValue}
        collectiveThresholdValue={collectiveValue}
     />
    );
  }

  skillData.forEach(skill => {
    const skillName = skill.SkillName;
    const isBelowTotalLoginThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Login, skill.AgentInfo.TotalLogin.ThresholdValue) : '';
    const isBelowBusyThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Busy, skill.AgentInfo.Busy.ThresholdValue): '';
    const isBelowOnBreakThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Break, skill.AgentInfo.OnBreak.ThresholdValue): '';
    const isBelowOnWrapThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Wrap, skill.AgentInfo.OnWrap.ThresholdValue): '';
    const isBelowWaitThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Wait, skill.AgentInfo.Wait.ThresholdValue): '';
    const isBelowCoachingThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Coaching, skill.AgentInfo.Coaching.ThresholdValue): '';
    const isBelowTrainingThreshold = agentInfoStats !== null ? extractDurations(skill.AgentInfo, Constants.AgentActivity.Training, skill.AgentInfo.Training.ThresholdValue): '';
    collectiveThresholdLoginValue[skillName] = isBelowTotalLoginThreshold;
    collectiveThresholdBreakValue[skillName] = isBelowOnBreakThreshold;
    collectiveThresholdBusyValue[skillName] = isBelowBusyThreshold;
    collectiveThresholdWrapValue[skillName] = isBelowOnWrapThreshold;
    collectiveThresholdWaitValue[skillName] = isBelowWaitThreshold;
    collectiveThresholdTrainingValue[skillName] = isBelowTrainingThreshold;
    collectiveThresholdCoachingValue[skillName] = isBelowCoachingThreshold;
  });

  function extractDurations(skillData, activity, thresholdValue) {
    if (skillData === null || thresholdValue === null) {
        return false;
    } else {
        const activityThreshold = skillData[activity].ThresholdValue;
        const activityToolTip = skillData[activity].ToolTip;
        if (thresholdValue !== Constants.ThresholdDuration) {
            return activityToolTip.Data.some(item => item.DURATION > activityThreshold);
        } else {
            return false;
        }
    }
  }

  skillData.forEach(skill => {
    const skillName = skill.SkillName;
    const agentInfo = skill.AgentInfo; 

    if (agentInfo !== null) {
      const totalLoginThreshold = extractThreshold(agentInfo, Constants.AgentActivity.Login);
      const busyThreshold = extractThreshold(agentInfo, Constants.AgentActivity.Busy);
      const breakThreshold = extractThreshold(agentInfo, Constants.AgentActivity.Break);
      const wrapThreshold = extractThreshold(agentInfo, Constants.AgentActivity.Wrap);
      const waitThreshold= extractThreshold(agentInfo, Constants.AgentActivity.Wait);
      const coachingThreshold = extractThreshold(agentInfo, Constants.AgentActivity.Coaching);
      const trainingThreshold = extractThreshold(agentInfo, Constants.AgentActivity.Training);

      if (totalLoginThreshold !== null) {
        TotalLoginThreshold[skillName] = totalLoginThreshold;
      }
      if (busyThreshold !== null) {
        BusyThreshold[skillName] = busyThreshold;
      }
      if (breakThreshold !== null) {
        BreakThreshold[skillName] = breakThreshold;
      }
      if (wrapThreshold !== null) {
        WrapThreshold[skillName] = wrapThreshold;
      }
      if (waitThreshold !== null) {
        WaitThreshold[skillName] = waitThreshold;
      }
      if (trainingThreshold !== null) {
        TrainingThreshold[skillName] = trainingThreshold;
      }
      if (coachingThreshold !== null) {
        CoachingThreshold[skillName] = coachingThreshold;
      }
    }
  });

  function extractThreshold(skillData, activity) {
    if (skillData === null || skillData[activity] === undefined) {
      return null;
    } else {
      return skillData[activity].ThresholdValue;
    }
  }


  for (const skillName in collectiveThresholdLoginValue) {
    if (collectiveThresholdLoginValue[skillName]) {
      isBelowTotalLoginThreshold = true;
        break;
    }
  }

  for (const skillName in collectiveThresholdBusyValue) {
    if (collectiveThresholdBusyValue[skillName]) {
      isBelowBusyThreshold = true;
        break;
    }
  }

  for (const skillName in collectiveThresholdBreakValue) {
    if (collectiveThresholdBreakValue[skillName]) {
      isBelowOnBreakThreshold = true;
        break;
    }
  }

  for (const skillName in collectiveThresholdWrapValue) {
    if (collectiveThresholdWrapValue[skillName]) {
      isBelowOnWrapThreshold = true;
        break;
    }
  }

  for (const skillName in collectiveThresholdWaitValue) {
    if (collectiveThresholdWaitValue[skillName]) {
      isBelowWaitThreshold = true;
        break;
    }
  }

  for (const skillName in collectiveThresholdTrainingValue) {
    if (collectiveThresholdTrainingValue[skillName]) {
      isBelowTrainingThreshold = true;
        break;
    }
  }

  for (const skillName in collectiveThresholdCoachingValue) {
    if (collectiveThresholdCoachingValue[skillName]) {
      isBelowCoachingThreshold = true;
        break;
    }
  } 
 
  return (
    <>
    <View style={styles.container}>
      <View style={styles.contentOverlay}>
        <View style={styles.titleContainer}>
          <View style={styles.timeLogoContainer}>
            {SvgIcon.SvgPulseLogo({width: styles.titleIconSize.width, height: styles.titleIconSize.height})}
          </View>
          <View style={showTimeContainer ? styles.timeLiveContainer : styles.timeCalendarContainer}>
            {showTimeContainer ? (<View style={styles.timeContainer}>
              <Text style={styles.timeFont}>Last Updated Time: </Text>
              <View>
                <Text style={styles.timeFont}>{skillData.length > 0 ? updateTime : '01/01/2000 12:00:00 AM' }</Text>
              </View>
            </View>
            ):(
            <>
            <View style={styles.calendarContainer}>
              {svgIcon.SvgTimer({width: styles.clockIcon.width, height: styles.clockIcon.height})}
              <TouchableOpacity onPress={toggleCalendarModal}>
                <Text style={styles.calendarFont}>{selectedTimeRange}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCalendarVisible}
              onRequestClose={toggleCalendarModal}
            >
              <View style={styles.modalCalendarContainer}>
                <View style={styles.modalCalendarContent}>
                  <View style={styles.modalHeaderContainer}>
                    {svgIcon.SvgTimerStats({width: styles.liveInternalIcon.width, height: styles.liveInternalIcon.height})}
                    <Text style={styles.modalHeaderText}>Time Stats</Text>
                    <TouchableOpacity onPress={toggleCalendarModal} style={styles.closeStyle}>
                      {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={timeRanges}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTimeRangeItem}
                  />
                </View>
              </View>
            </Modal>
            </>
            )}
          </View>
          <View>
            <View style={styles.imageContainer}>
              {selectedFeed === true ?
                (
                  svgIcon.SvgYesterday({width: styles.liveInternalIcon.width, height: styles.liveInternalIcon.height, color: '#fff'})
                ) : (
                  svgIcon.SvgLiveLogo({width: styles.liveIcon.width, height: styles.liveIcon.height})
                )}
            </View>
          </View>  
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableHighlight
            style={styles.dropdownTrigger}
            onPress={toggleDropdownModal}
            underlayColor='#fff'
          >
            <View style={styles.dropdownContent}>
              <View style={styles.contentContainer}>
                <Text style={styles.filterText}>{selectedDropdownOption}</Text>
              </View>
              {isDropdownModalVisible ? (
                svgIcon.SvgCaretUp({width: styles.dropdownIconSize.width, height: styles.dropdownIconSize.height})
              ) : (
                svgIcon.SvgCaretDown({width: styles.dropdownIconSize.width, height: styles.dropdownIconSize.height})
              )}
            </View>
          </TouchableHighlight>
          <DropdownModal
            isVisible={isDropdownModalVisible}
            onClose={toggleDropdownModal}
            options={campaignFilterData}
            onSelect={handleDropdownSelect}
            selectedOption={selectedDropdownOption}
            setSelectedOption={setSelectedDropdownOption}/>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabStyle,
              activeTab === Constants.PulseTab.Summary && styles.activeTabItem,
            ]}
            onPress={switchToSummaryTab}
            disabled={activeTab === Constants.PulseTab.Summary}
          >
            <Text style={[styles.tabText, activeTab === Constants.PulseTab.Summary && styles.activeTabText]}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabStyle,
              activeTab === Constants.PulseTab.HourlySkills && styles.activeTabItem,
            ]}
            onPress={switchToHourlySkillsTab}
            disabled={activeTab === Constants.PulseTab.HourlySkills}
          >
            <Text style={[styles.tabText, activeTab === Constants.PulseTab.HourlySkills && styles.activeTabText]}>Hourly Skills</Text>
          </TouchableOpacity>
        </View>
        {activeTab === Constants.PulseTab.Summary && (
          skillData.length > 0 ? (
            <>     
              {showRowMainContainer && (
                <>
                <View style={styles.scrollableContainer}>             
                  <ScrollView horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.rowMainContainer}
                    >
                    <View style={styles.rowContainer}>
                      <Animatable.View
                        style={[styles.row, isBelowTotalLoginThreshold && styles.animatedBackground]}
                        animation={isBelowTotalLoginThreshold ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleLoginModal} disabled={agentInfoStats.TotalLogin.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowTotalLoginThreshold ?  styles.rowThresholdLowerText :styles.rowLowerText}>Login</Text>
                            {isBelowTotalLoginThreshold? 
                              (svgIcon.SvgLogin({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgLogin({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.TotalLogin.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.TotalLogin.Text }</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowTotalLoginThreshold ? styles.rowThresholdUpperText :styles.rowUpperText }>
                                  {agentInfoStats.TotalLogin.Text }
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.TotalLogin.ToolTip  && agentInfoStats.TotalLogin.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.AgentLogin, isLoginModalVisible, toggleLoginModal,
                            agentInfoStats.TotalLogin.ToolTip.Data, updateTime, agentInfoStats.TotalLogin.ThresholdValue, TotalLoginThreshold)
                        )}
                      </Animatable.View>
                      <Animatable.View
                        style={[styles.row, isBelowBusyThreshold && styles.animatedBackground]}
                        animation={isBelowBusyThreshold ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleBusyModal} disabled={agentInfoStats.Busy.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowBusyThreshold ?  styles.rowThresholdLowerText :styles.rowLowerText}>Busy</Text>
                            {isBelowBusyThreshold ? 
                              (svgIcon.SvgBusy({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgBusy({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.Busy.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.Busy.Text}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowBusyThreshold ? styles.rowThresholdUpperText :styles.rowUpperText}>
                                  {agentInfoStats.Busy.Text}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>                              
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.Busy.ToolTip && agentInfoStats.Busy.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.Busy, isBusyModalVisible, toggleBusyModal,
                            agentInfoStats.Busy.ToolTip.Data, updateTime, agentInfoStats.Busy.ThresholdValue, BusyThreshold)
                        )}
                      </Animatable.View>
                      <Animatable.View
                        style={[styles.row, isBelowWaitThreshold && styles.animatedBackground]}
                        animation={isBelowWaitThreshold ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleWaitModal} disabled={agentInfoStats.Wait.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowWaitThreshold ?  styles.rowThresholdLowerText :styles.rowLowerText}>Wait</Text>
                            {isBelowWaitThreshold ? 
                              (svgIcon.SvgWait({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgWait({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.Wait.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.Wait.Text}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowWaitThreshold ? styles.rowThresholdUpperText :styles.rowUpperText}>
                                  {agentInfoStats.Wait.Text}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>                              
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.Wait.ToolTip && agentInfoStats.Wait.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.Wait, isWaitModalVisible, toggleWaitModal,
                          agentInfoStats.Wait.ToolTip.Data, updateTime, agentInfoStats.Wait.ThresholdValue, WaitThreshold)
                        )}
                      </Animatable.View>
                      <Animatable.View
                        style={[styles.row, isBelowOnWrapThreshold && styles.animatedBackground]}
                        animation={isBelowOnWrapThreshold ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleOnWrapModal} disabled={agentInfoStats.OnWrap.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowOnWrapThreshold ?  styles.rowThresholdLowerText :styles.rowLowerText}>Wrap</Text>
                            {isBelowOnWrapThreshold ? 
                              (svgIcon.SvgWrap({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgWrap({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.OnWrap.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.OnWrap.Text}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowOnWrapThreshold ? styles.rowThresholdUpperText :styles.rowUpperText}>
                                  {agentInfoStats.OnWrap.Text}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.OnWrap.ToolTip && agentInfoStats.OnWrap.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.OnWrap, isOnWrapModalVisible, toggleOnWrapModal,
                            agentInfoStats.OnWrap.ToolTip.Data, updateTime, agentInfoStats.OnWrap.ThresholdValue, WrapThreshold)
                        )}
                      </Animatable.View>
                    </View>
                    <View style={styles.rowContainer}>
                      <View style={styles.row}>                       
                        <View style={styles.LogoContainer}>
                          <Text style={styles.rowLowerText}>Call Back</Text>
                          {svgIcon.SvgCallBack({width: styles.LogoIcon.width, height: styles.LogoIcon.height})}
                        </View>
                        <Text style={styles.rowUpperText}>{agentInfoStats.OutboundCall.Text}</Text>                      
                      </View>
                      <Animatable.View
                        style={[styles.row, isBelowOnBreakThreshold && styles.animatedBackground]}
                        animation={isBelowOnBreakThreshold ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleBreakModal} disabled={agentInfoStats.OnBreak.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowOnBreakThreshold? styles.rowThresholdLowerText :styles.rowLowerText}>Break</Text>
                            {isBelowOnBreakThreshold ? 
                              (svgIcon.SvgBreak({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgBreak({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.OnBreak.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.OnBreak.Text}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowOnBreakThreshold ? styles.rowThresholdUpperText :styles.rowUpperText}>
                                  {agentInfoStats.OnBreak.Text}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>                              
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.OnBreak.ToolTip && agentInfoStats.OnBreak.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.OnBreak, isBreakModalVisible, toggleBreakModal,
                          agentInfoStats.OnBreak.ToolTip.Data, updateTime, agentInfoStats.OnBreak.ThresholdValue, BreakThreshold)
                        )}
                      </Animatable.View>
                      <Animatable.View
                        style={[styles.row, isBelowTrainingThreshold && styles.animatedBackground]}
                        animation={isBelowTrainingThreshold ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleTrainingModal} disabled={agentInfoStats.Training.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowTrainingThreshold ? styles.rowThresholdLowerText :styles.rowLowerText}>Training</Text>
                            {isBelowTrainingThreshold ? 
                              (svgIcon.SvgTraining({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgTraining({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.Training.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.Training.Text}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowTrainingThreshold ? styles.rowThresholdUpperText :styles.rowUpperText}>
                                  {agentInfoStats.Training.Text}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>                              
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.Training.ToolTip && agentInfoStats.Training.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.Training, isTrainingModalVisible, toggleTrainingModal,
                            agentInfoStats.Training.ToolTip.Data, updateTime, agentInfoStats.Training.ThresholdValue, TrainingThreshold)
                        )}
                      </Animatable.View>
                      <Animatable.View
                        style={[styles.row, isBelowCoachingThreshold && styles.animatedBackground]}
                        animation={isBelowCoachingThreshold  ? Constants.Animation.type : undefined}
                        iterationCount={Constants.Animation.iteration}
                        iterationDelay={1000}
                      >
                        <TouchableOpacity onPress={toggleCoachingModal} disabled={agentInfoStats.Coaching.Text <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={isBelowCoachingThreshold  ? styles.rowThresholdLowerText :styles.rowLowerText}>Coaching</Text>
                            {isBelowCoachingThreshold  ? 
                              (svgIcon.SvgCoaching({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.active})):
                              (svgIcon.SvgCoaching({width: styles.LogoIcon.width, height: styles.LogoIcon.height, color: styles.ThresholdBackColor.inactive}))
                            }
                          </View>
                          {agentInfoStats.Coaching.Text <= 0 ? (
                            <Text style={styles.rowUpperText}>{agentInfoStats.Coaching.Text}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => {}} disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={isBelowCoachingThreshold ? styles.rowThresholdUpperText :styles.rowUpperText}>
                                  {agentInfoStats.Coaching.Text}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({width: styles.agentIconSize.width, height: styles.agentIconSize.height})}                              
                                </View>                              
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {agentInfoStats.Coaching.ToolTip && agentInfoStats.Coaching.ToolTip.Data !== null && (
                          RenderModelFunction(Constants.AgentActivity.Training, isCoachingModalVisible, toggleCoachingModal,
                            agentInfoStats.Coaching.ToolTip.Data, updateTime, agentInfoStats.Coaching.ThresholdValue, CoachingThreshold)
                        )}
                      </Animatable.View>
                    </View>
                  </ScrollView>
                </View>
                <View style={styles.scrollableContainer}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
                    style={styles.rowMainContainer}
                  >
                    <View style={styles.rowContainer}>
                      <View style={styles.rguRow}>
                        <View style={styles.LogoContainer}>
                          <Text style={styles.rowRguUpperText}>Occupancy</Text>
                          {svgIcon.SvgOccupancy({width: styles.LogoIcon.width, height: styles.LogoIcon.height})}
                        </View>                        
                        <Text style={styles.rowRguLowerText}>{agentInfoStats.Occupancy}</Text>
                      </View>
                      <View style={styles.rguRow}>            
                        <View style={styles.LogoContainer}>
                          <Text style={styles.rowRguUpperText}>RGU / Login Hours</Text>
                          {svgIcon.SvgRGU_Login({width: styles.LogoIcon.width, height: styles.LogoIcon.height})}
                        </View> 
                        <Text style={styles.rowRguLowerText}>{agentInfoStats.RGU_Per_Login_Hour}</Text>
                      </View>
                      <View style={styles.rguRow}>
                        <View style={styles.LogoContainer}>
                          <Text style={styles.rowRguUpperText}>RGU / Prod Hours</Text>
                          {svgIcon.SvgRGU_Prod({width: styles.LogoIcon.width, height: styles.LogoIcon.height})}
                        </View>                      
                        <Text style={styles.rowRguLowerText}>{agentInfoStats.RGU_Per_Prod_Hour}</Text>
                      </View>
                      <View style={styles.rguRow}>                       
                        <View style={styles.LogoContainer}>
                          <Text style={styles.rowRguUpperText}>RGU / Work Hours</Text>
                          {svgIcon.SvgRGU_Work({width: styles.LogoIcon.width, height: styles.LogoIcon.height})}
                        </View>
                        <Text style={styles.rowRguLowerText}>{agentInfoStats.RGU_Per_Work_Hour}</Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
                </>
              )}
              <View style={showRowMainContainer?styles.scrollableContainer:styles.scrollableVerticalOneContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
                  style={showRowMainContainer?styles.rowMainContainer:styles.rowMainVerticalContainer}
                  >
                  {!showRowMainContainer && (
                    <View style={styles.NotMainContainer}>
                      <View style={showRowMainContainer?styles.rowContainer: styles.rowVerticalContainer}>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleInitiatedModal} disabled={summaryCallsStats.Initiated.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Initiated</Text>
                              {svgIcon.SvgInitiated({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Initiated.Value <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Initiated.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.Initiated.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Initiated.PopUpData && summaryCallsStats.Initiated.PopUpData.Data !== null && (
                            modalData.InitiatedTable(isInitiatedModalVisible, toggleInitiatedModal,
                              summaryCallsStats.Initiated.PopUpData, Constants.Pulse_CallsStats.Initiated, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Offered</Text>
                            {svgIcon.SvgOffers({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Offer}</Text>
                        </View>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleAnsweredModal} disabled={summaryCallsStats.Answer.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Answered</Text>
                              {svgIcon.SvgAnswered({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Answer.Value <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Answer.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.Answer.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Answer.PopUpData && summaryCallsStats.Answer.PopUpData.Data !== null && (
                            modalData.AnsweredTable(isAnsweredModalVisible, toggleAnsweredModal,
                              summaryCallsStats.Answer.PopUpData, Constants.Pulse_CallsStats.Answered, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleAbandonedModal} disabled={summaryCallsStats.Abandon.Abandon_Percentage <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Abandoned %</Text>
                              {svgIcon.SvgAbandoned({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Abandon.Abandon_Percentage <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Abandon.Abandon_Percentage}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.Abandon.Abandon_Percentage}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Abandon.AbandonsDuration && summaryCallsStats.Abandon.AbandonsDuration.Data !== null && (
                            modalData.AbandonedTable(isAbandonedModalVisible, toggleAbandonedModal,
                              summaryCallsStats.Abandon.AbandonsDuration, Constants.Pulse_CallsStats.AbandonsDuration, updateTime)
                          )}
                        </View>
                      </View>
                      <View style={showRowMainContainer?styles.rowContainer: styles.rowVerticalContainer}>  
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleShortAbandonedModal} disabled={summaryCallsStats.Short_Abandons.Count <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Short Abandons</Text>
                              {svgIcon.SvgShortAbandoned({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Short_Abandons.Count <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Short_Abandons.Count}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.Short_Abandons.Count}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Short_Abandons.PopUpData && summaryCallsStats.Short_Abandons.PopUpData.Data !== null && (
                            modalData.AbandonedShortTable(isShortAbandonedModalVisible, toggleShortAbandonedModal,
                              summaryCallsStats.Short_Abandons.PopUpData, Constants.Pulse_CallsStats.ShortAbandons, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleIVRModal} disabled={summaryCallsStats.IVRHangups.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>IVR Hangups</Text>
                              {svgIcon.SvgIVRHangups({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.IVRHangups.Value <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.IVRHangups.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.IVRHangups.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.IVRHangups.PopUpData && summaryCallsStats.IVRHangups.PopUpData.Data !== null && (
                            modalData.IVRHangupsTable(isIVRModalVisible, toggleIVRModal,
                              summaryCallsStats.IVRHangups.PopUpData, Constants.Pulse_CallsStats.IVRHangups, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleFatalModal} disabled={summaryCallsStats.Fatal_Calls.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Fatal Calls</Text>
                              {svgIcon.SvgFatalCalls({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Fatal_Calls.Value <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Fatal_Calls.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.Fatal_Calls.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Fatal_Calls.PopUpData && summaryCallsStats.Fatal_Calls.PopUpData.Data !== null && (
                            modalData.FatalCallsTable(isFatalModalVisible, toggleFatalModal,
                              summaryCallsStats.Fatal_Calls.PopUpData, Constants.Pulse_CallsStats.FatalCalls, updateTime, summaryCallsStats.Fatal_Calls.Comment)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                          <TouchableOpacity onPress={toggleRepeatModal} disabled={summaryCallsStats.Repeat_Call.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Repeat Calls</Text>
                              {svgIcon.SvgRepeatCalls({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Repeat_Call.Value <= 0 ? (
                              <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Repeat_Call.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowUpperText}>
                                    {summaryCallsStats.Repeat_Call.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Repeat_Call.PopUpData && summaryCallsStats.Repeat_Call.PopUpData.Data !== null && (
                            modalData.RepeatCallsTable(isRepeatModalVisible, toggleRepeatModal,
                              summaryCallsStats.Repeat_Call.PopUpData, Constants.Pulse_CallsStats.RepeatCalls, updateTime)
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                  {showRowMainContainer && (
                    <>
                    <View style={showRowMainContainer ? styles.rowContainer : styles.rowVerticalContainer}>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleInitiatedModal} disabled={summaryCallsStats.Initiated.Value <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Initiated</Text>
                            {svgIcon.SvgInitiated({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.Initiated.Value <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Initiated.Value}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.Initiated.Value}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.Initiated.PopUpData && summaryCallsStats.Initiated.PopUpData.Data !== null && (
                          modalData.InitiatedTable(isInitiatedModalVisible, toggleInitiatedModal,
                            summaryCallsStats.Initiated.PopUpData, Constants.Pulse_CallsStats.Initiated, updateTime)
                        )}
                      </View>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <View style={styles.LogoContainer}>
                          <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Offered</Text>
                          {svgIcon.SvgOffers({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                        </View>
                        <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Offer}</Text>
                      </View>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleAnsweredModal} disabled={summaryCallsStats.Answer.Value <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Answered</Text>
                            {svgIcon.SvgAnswered({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.Answer.Value <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Answer.Value}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.Answer.Value}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.Answer.PopUpData && summaryCallsStats.Answer.PopUpData.Data !== null && (
                          modalData.AnsweredTable(isAnsweredModalVisible, toggleAnsweredModal,
                            summaryCallsStats.Answer.PopUpData, Constants.Pulse_CallsStats.Answered, updateTime)
                        )}
                      </View>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleAbandonedModal} disabled={summaryCallsStats.Abandon.Abandon_Percentage <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Abandoned %</Text>
                            {svgIcon.SvgAbandoned({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.Abandon.Abandon_Percentage <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Abandon.Abandon_Percentage}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.Abandon.Abandon_Percentage}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.Abandon.AbandonsDuration && summaryCallsStats.Abandon.AbandonsDuration.Data !== null && (
                          modalData.AbandonedTable(isAbandonedModalVisible, toggleAbandonedModal,
                            summaryCallsStats.Abandon.AbandonsDuration, Constants.Pulse_CallsStats.AbandonsDuration, updateTime)
                        )}
                      </View>
                    </View>
                    <View style={showRowMainContainer ? styles.rowContainer : styles.rowVerticalContainer}>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleShortAbandonedModal} disabled={summaryCallsStats.Short_Abandons.Count <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Short Abandons</Text>
                            {svgIcon.SvgShortAbandoned({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.Short_Abandons.Count  <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Short_Abandons.Count }</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.Short_Abandons.Count}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.Short_Abandons.PopUpData && summaryCallsStats.Short_Abandons.PopUpData.Data !== null && (
                          modalData.AbandonedShortTable(isShortAbandonedModalVisible, toggleShortAbandonedModal,
                            summaryCallsStats.Short_Abandons.PopUpData, Constants.Pulse_CallsStats.ShortAbandons, updateTime)
                        )}
                      </View>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleIVRModal} disabled={summaryCallsStats.IVRHangups.Value <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>IVR Hangups</Text>
                            {svgIcon.SvgIVRHangups({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.IVRHangups.Value <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.IVRHangups.Value}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.IVRHangups.Value}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.IVRHangups.PopUpData && summaryCallsStats.IVRHangups.PopUpData.Data !== null && (
                          modalData.IVRHangupsTable(isIVRModalVisible, toggleIVRModal,
                            summaryCallsStats.IVRHangups.PopUpData, Constants.Pulse_CallsStats.IVRHangups, updateTime)
                        )}
                      </View>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleFatalModal} disabled={summaryCallsStats.Fatal_Calls.Value <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Fatal Calls</Text>
                            {svgIcon.SvgFatalCalls({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.Fatal_Calls.Value <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Fatal_Calls.Value}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.Fatal_Calls.Value}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.Fatal_Calls.PopUpData && summaryCallsStats.Fatal_Calls.PopUpData.Data !== null && (
                          modalData.FatalCallsTable(isFatalModalVisible, toggleFatalModal,
                            summaryCallsStats.Fatal_Calls.PopUpData, Constants.Pulse_CallsStats.FatalCalls, updateTime, summaryCallsStats.Fatal_Calls.Comment)
                        )}
                      </View>
                      <View style={showRowMainContainer ? styles.detailRow : styles.detailVerticalRow}>
                        <TouchableOpacity onPress={toggleRepeatModal} disabled={summaryCallsStats.Repeat_Call.Value <= 0}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Repeat Calls</Text>
                            {svgIcon.SvgRepeatCalls({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          {summaryCallsStats.Repeat_Call.Value <= 0 ? (
                            <Text style={styles.rowDetailUpperText}>{summaryCallsStats.Repeat_Call.Value}</Text>
                          ) : (
                            <TouchableOpacity onPress={() => { } } disabled={true}>
                              <View style={styles.rowContent}>
                                <Text style={styles.rowUpperText}>
                                  {summaryCallsStats.Repeat_Call.Value}
                                </Text>
                                <View style={styles.exclamationStyle}>
                                  {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </TouchableOpacity>
                        {summaryCallsStats.Repeat_Call.PopUpData && summaryCallsStats.Repeat_Call.PopUpData.Data!== null && (
                          modalData.RepeatCallsTable(isRepeatModalVisible, toggleRepeatModal,
                            summaryCallsStats.Repeat_Call.PopUpData, Constants.Pulse_CallsStats.RepeatCalls, updateTime)
                        )}
                      </View>
                    </View>
                    </>
                  )}
                </ScrollView>
              </View>
              <View style={showRowMainContainer?styles.scrollableContainer:styles.scrollableVerticalTwoContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
                  style={showRowMainContainer?styles.rowMainContainer:styles.rowMainVerticalContainer}
                  >
                  {!showRowMainContainer && (
                    <View style={styles.NotMainContainer}>
                      <View style={showRowMainContainer?styles.rowContainer: styles.rowVerticalContainer}>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleRGUModal} disabled={summarySalesStats.RGUInfo.RGU <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>RGUs</Text>
                              {svgIcon.SvgRGU({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.RGUInfo.RGU <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.RGUInfo.RGU}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.RGUInfo.RGU}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.RGUInfo && summarySalesStats.SaleInfo!== null && (
                            modalData.RGUTable(isRGUModalVisible, toggleRGUModal,
                              summarySalesStats.RGUInfo, summarySalesStats.SaleInfo, Constants.Pulse_SalesStats.SalesDetails, activeRGUTab, setActiveRGUTab, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Telco CR%</Text>
                            {svgIcon.SvgTelcoCR({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          <Text style={styles.rowFirstRightText}>{summarySalesStats.RGU_CR}</Text>
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleUtilityModal} disabled={summarySalesStats.Utility_RGU.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Utility Products</Text>
                              {svgIcon.SvgUtilityProduct({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Utility_RGU.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Utility_RGU.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Utility_RGU.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Utility_RGU.PopUpData && summarySalesStats.Utility_RGU.PopUpData.Data !== null && (
                            modalData.UtiltyProductTable(isUtilityModalVisible, toggleUtilityModal,
                              summarySalesStats.Utility_RGU.PopUpData, Constants.Pulse_SalesStats.UtilityProducts, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Overall CR %</Text>
                            {svgIcon.SvgOverallCR({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          <Text style={styles.rowFirstRightText}>{summarySalesStats.Overall_CR}</Text>
                        </View> 
                      </View> 
                      <View style={showRowMainContainer?styles.rowContainer: styles.rowVerticalContainer}>   
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleQualificationModal} disabled={summarySalesStats.Qualifications.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Qualifications</Text>
                              {svgIcon.SvgQualifications({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Qualifications.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Qualifications.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Qualifications.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Qualifications.PopUpData && summarySalesStats.Qualifications.PopUpData.Data !== null && (
                            modalData.QualificationsTable(isQualificationModalVisible, toggleQualificationModal,
                              summarySalesStats.Qualifications.PopUpData, Constants.Pulse_SalesStats.Qualifications, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleAddOnsModal} disabled={summarySalesStats.Addons.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Add-Ons</Text>
                              {svgIcon.SvgAddOns({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Addons.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Addons.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Addons.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Addons.PopUpData && summarySalesStats.Addons.PopUpData.Data !== null && (
                            modalData.AddOnsTable(isAddOnsModalVisible, toggleAddOnsModal,
                              summarySalesStats.Addons.PopUpData, Constants.Pulse_SalesStats.Addons, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleOptinsModal} disabled={summarySalesStats.Optins.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Opt-Ins</Text>
                              {svgIcon.SvgOptIns({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Optins.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Optins.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Optins.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Optins.PopUpData && summarySalesStats.Optins.PopUpData.Data !== null && (
                            modalData.AddOnsTable(isOptinsModalVisible, toggleOptinsModal,
                              summarySalesStats.Optins.PopUpData, Constants.Pulse_SalesStats.Optins, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleOutboundModal} disabled={summaryCallsStats.Outbound_RGUs.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Outbound RGUs</Text>
                              {svgIcon.SvgOutboundCalls({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Outbound_RGUs.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summaryCallsStats.Outbound_RGUs.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summaryCallsStats.Outbound_RGUs.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Outbound_RGUs.PopUpData && summaryCallsStats.Outbound_RGUs.PopUpData.Data !== null && (
                            modalData.OutboundCallsTable(isOutboundModalVisible, toggleOutboundModal,
                              summaryCallsStats.Outbound_RGUs.PopUpData, Constants.Pulse_SalesStats.OutboundRGUs, updateTime, summaryCallsStats.Outbound_RGUs.Comment)
                          )}
                        </View>                           
                      </View>
                    </View>
                  )}
                  {showRowMainContainer && (
                    <>
                      <View style={showRowMainContainer ? styles.rowContainer : styles.rowVerticalContainer}>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleRGUModal} disabled={summarySalesStats.RGUInfo.RGU <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>RGUs</Text>
                              {svgIcon.SvgRGU({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.RGUInfo.RGU <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.RGUInfo.RGU}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.RGUInfo.RGU}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.RGUInfo && summarySalesStats.SaleInfo!== null && (
                            modalData.RGUTable(isRGUModalVisible, toggleRGUModal,
                              summarySalesStats.RGUInfo, summarySalesStats.SaleInfo, Constants.Pulse_SalesStats.SalesDetails, activeRGUTab, setActiveRGUTab, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Telco CR%</Text>
                            {svgIcon.SvgTelcoCR({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          <Text style={styles.rowFirstRightText}>{summarySalesStats.RGU_CR}</Text>
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleUtilityModal} disabled={summarySalesStats.Utility_RGU.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Utility Products</Text>
                              {svgIcon.SvgUtilityProduct({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Utility_RGU.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Utility_RGU.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Utility_RGU.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Utility_RGU.PopUpData && summarySalesStats.Utility_RGU.PopUpData.Data !== null && (
                            modalData.UtiltyProductTable(isUtilityModalVisible, toggleUtilityModal,
                              summarySalesStats.Utility_RGU.PopUpData, Constants.Pulse_SalesStats.UtilityProducts, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <View style={styles.LogoContainer}>
                            <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Overall CR %</Text>
                            {svgIcon.SvgOverallCR({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                          </View>
                          <Text style={styles.rowFirstRightText}>{summarySalesStats.Overall_CR}</Text>
                        </View>
                      </View>
                      <View style={showRowMainContainer ? styles.rowContainer : styles.rowVerticalContainer}>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleQualificationModal} disabled={summarySalesStats.Qualifications.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Qualifications</Text>
                              {svgIcon.SvgQualifications({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Qualifications.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Qualifications.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Qualifications.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Qualifications.PopUpData && summarySalesStats.Qualifications.PopUpData.Data !== null && (
                            modalData.QualificationsTable(isQualificationModalVisible, toggleQualificationModal,
                              summarySalesStats.Qualifications.PopUpData, Constants.Pulse_SalesStats.Qualifications, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleAddOnsModal} disabled={summarySalesStats.Addons.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Add-Ons</Text>
                              {svgIcon.SvgAddOns({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Addons.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Addons.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Addons.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Addons.PopUpData && summarySalesStats.Addons.PopUpData.Data !== null && (
                            modalData.AddOnsTable(isAddOnsModalVisible, toggleAddOnsModal,
                              summarySalesStats.Addons.PopUpData, Constants.Pulse_SalesStats.Addons, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleOptinsModal} disabled={summarySalesStats.Optins.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Opt-Ins</Text>
                              {svgIcon.SvgOptIns({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summarySalesStats.Optins.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summarySalesStats.Optins.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summarySalesStats.Optins.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summarySalesStats.Optins.PopUpData && summarySalesStats.Optins.PopUpData.Data !== null && (
                            modalData.AddOnsTable(isOptinsModalVisible, toggleOptinsModal,
                              summarySalesStats.Optins.PopUpData, Constants.Pulse_SalesStats.Optins, updateTime)
                          )}
                        </View>
                        <View style={showRowMainContainer ? styles.detailFirstRow : styles.detailFirstVerticalRow}>
                          <TouchableOpacity onPress={toggleOutboundModal} disabled={summaryCallsStats.Outbound_RGUs.Value <= 0}>
                            <View style={styles.LogoContainer}>
                              <Text style={showRowMainContainer ? styles.rowFirstLeftText : styles.rowFirstVerticalLeftText}>Outbound RGUs</Text>
                              {svgIcon.SvgOutboundCalls({ width: styles.LogoIcon.width, height: styles.LogoIcon.height })}
                            </View>
                            {summaryCallsStats.Outbound_RGUs.Value <= 0 ? (
                              <Text style={styles.rowFirstRightText}>{summaryCallsStats.Outbound_RGUs.Value}</Text>
                            ) : (
                              <TouchableOpacity onPress={() => { } } disabled={true}>
                                <View style={styles.rowContent}>
                                  <Text style={styles.rowFirstRightText}>
                                    {summaryCallsStats.Outbound_RGUs.Value}
                                  </Text>
                                  <View style={styles.exclamationStyle}>
                                    {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                          {summaryCallsStats.Outbound_RGUs.PopUpData && summaryCallsStats.Outbound_RGUs.PopUpData.Data !== null && (
                            modalData.OutboundCallsTable(isOutboundModalVisible, toggleOutboundModal,
                              summaryCallsStats.Outbound_RGUs.PopUpData, Constants.Pulse_SalesStats.OutboundRGUs, updateTime, summaryCallsStats.Outbound_RGUs.Comment)
                          )}
                        </View>
                      </View>
                    </>
                  )}
                </ScrollView>
              </View>
            </>
          ):(
            <View style={styles.emptyDataRow}>
              {svgIcon.SvgNoData({width: styles.RecordSize.width, height: styles.RecordSize.height})}
            </View>
          )
        )}
        {activeTab === Constants.PulseTab.HourlySkills && (
          <DataTable data={SkillStats} />
        )}
      </View>
    </View>
    {skillData.length > 0 ? (
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.dropdownLocationTrigger}
            onPress={toggleLocationModal}
          >
            {selectedCountry === 'Pakistan' ? (
              svgIcon.SvgPakistan({width: styles.flagSize.width, height: styles.flagSize.height})
            ) : selectedCountry === 'Jamaica' ? (
              svgIcon.SvgJamaica({width: styles.flagSize.width, height: styles.flagSize.height})
            ) : selectedCountry === 'Philippines' ? (
              svgIcon.SvgPhilippines({width: styles.flagSize.width, height: styles.flagSize.height})
            ) : selectedCountry === 'Belize' ? (
              svgIcon.SvgBelize({width: styles.flagSize.width, height: styles.flagSize.height})
            ) : (
              svgIcon.SvgLocation({width: styles.flagIconSize.width, height: styles.flagIconSize.height, color: userItemColor.color})
            )}
          </TouchableOpacity>
          <Modal
            visible={showLocationModal}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleLocationModal}
          >
            <TouchableWithoutFeedback onPress={toggleLocationModal}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => { } }>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeaderContainer}>
                      {svgIcon.SvgLocation({width: styles.flagIconSize.width, height: styles.flagIconSize.height, color: styles.timeFont.color})}
                      <Text style={styles.modalHeaderText}>Choose Location</Text>
                      <TouchableOpacity onPress={toggleLocationModal} style={styles.closeStyle}>
                        {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.touchablesContainer}>
                      <TouchableOpacity onPress={() => handleDropdownSelection('ALL')}
                        disabled={selectedCountry === 'ALL'}
                        style={styles.touchableContainer}
                      >
                        <View style={[
                          styles.dropdownItem,
                          selectedCountry === 'ALL' && styles.activeDropdownItem,
                        ]}>
                        {selectedCountry === 'ALL' ? (
                          svgIcon.SvgAllLogo({ width: styles.flagSize.width, height: styles.flagSize.height, fillColor: '#fff' })
                        ) : (
                          svgIcon.SvgAllLogo({ width: styles.flagSize.width, height: styles.flagSize.height, fillColor: '#152e57' })
                        )}                   
                          <Text style={[styles.dropdownLocationText, selectedCountry === 'ALL' && styles.activeDropdownText]}>ALL</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDropdownSelection('Pakistan')}
                        disabled={selectedCountry === 'Pakistan'}
                        style={styles.touchableContainer}>
                        <View style={[
                          styles.dropdownItem,
                          selectedCountry === 'Pakistan' && styles.activeDropdownItem,
                        ]}>
                          {svgIcon.SvgPakistan({width: styles.flagSize.width, height: styles.flagSize.height})}
                          <Text style={[styles.dropdownLocationText, selectedCountry === 'Pakistan' && styles.activeDropdownText]}>PAKISTAN</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    {location.Locations.length == 3 ? (
                      <View style={styles.touchablesContainer}>
                        <TouchableOpacity onPress={() => handleDropdownSelection('Jamaica')}
                          disabled={selectedCountry === 'Jamaica'}
                          style={styles.touchableloneContainer}>
                          <View style={[
                            styles.dropdownItem,
                            selectedCountry === 'Jamaica' && styles.activeDropdownItem,
                          ]}>
                            {svgIcon.SvgJamaica({width: styles.flagSize.width, height: styles.flagSize.height})}
                            <Text style={[styles.dropdownLocationText, selectedCountry === 'Jamaica' && styles.activeDropdownText]}>JAMAICA</Text>
                          </View>
                        </TouchableOpacity>
                        
                      </View>
                    ):(                  
                      <View style={styles.touchablesContainer}>
                        <TouchableOpacity onPress={() => handleDropdownSelection('Jamaica')}
                          disabled={selectedCountry === 'Jamaica'}
                          style={styles.touchableContainer}>
                          <View style={[
                            styles.dropdownItem,
                            selectedCountry === 'Jamaica' && styles.activeDropdownItem,
                          ]}>
                            {svgIcon.SvgJamaica({width: styles.flagSize.width, height: styles.flagSize.height})}
                            <Text style={[styles.dropdownLocationText, selectedCountry === 'Jamaica' && styles.activeDropdownText]}>JAMAICA</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDropdownSelection('Belize')}
                          disabled={selectedCountry === 'Belize'}
                          style={styles.touchableContainer}>
                          <View style={[
                            styles.dropdownItem,
                            selectedCountry === 'Belize' && styles.activeDropdownItem,
                          ]}>
                            {svgIcon.SvgBelize({width: styles.flagSize.width, height: styles.flagSize.height})}
                            <Text style={[styles.dropdownLocationText, selectedCountry === 'Belize' && styles.activeDropdownText]}>BELIZE</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
  
                    {showFilterButton && (
                    <View style={styles.touchablesContainer}>  
                      <TouchableOpacity onPress={() => handleDropdownSelection('Philippines')}
                        disabled={selectedCountry === 'Philippines'}
                        style={styles.touchableloneContainer}>
                        <View style={[
                          styles.dropdownItem,
                          selectedCountry === 'Philippines' && styles.activeDropdownItem,
                        ]}>
                          {svgIcon.SvgPhilippines({width: styles.flagSize.width, height: styles.flagSize.height})}
                          <Text style={[styles.dropdownLocationText, selectedCountry === 'Philippines' && styles.activeDropdownText]}>PHILIPPINES</Text>
                        </View>
                      </TouchableOpacity>   
                    </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
              style={styles.dropdownLocationTrigger}
              onPress={toggleUserModal}
            >
              {selectedCenter === 'DGS' ? (
                svgIcon.SvgCore({width: styles.flagSize.width, height: styles.flagSize.height, color: locationItemColor.color})
              ) : selectedCenter === 'DEALERS' ? (
                svgIcon.SvgDealer({width: styles.flagSize.width, height: styles.flagSize.height, color: locationItemColor.color})
              ) : (
                svgIcon.SvgSalesChannel({width: styles.flagSize.width, height: styles.flagSize.height, color: locationItemColor.color})
              )}
          </TouchableOpacity>
          <Modal
            visible={showUserModal}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleUserModal}
          >
            <TouchableWithoutFeedback onPress={toggleUserModal}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => { }}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeaderContainer}>
                      {svgIcon.SvgSalesChannel({width: styles.flagSize.width, height: styles.flagSize.height, color: styles.timeFont.color})}
                      <Text style={styles.modalHeaderText}>Sales Channel</Text>
                      <TouchableOpacity onPress={toggleUserModal} style={styles.closeStyle}>
                        {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.touchablesContainer}>
                      <TouchableOpacity onPress={() => handleDropdownUserSelection('DEFAULT')} 
                        disabled={selectedCenter === 'DEFAULT'}
                        style={styles.touchableContainer}>
                        <View style={[
                          styles.dropdownItem,
                          selectedCenter === 'DEFAULT' && styles.activeDropdownItem,
                        ]}>
                          {selectedCenter === 'DEFAULT' ? (
                            svgIcon.SvgAllLogo({ width: styles.flagSize.width, height: styles.flagSize.height, fillColor: '#fff' })
                          ) : (
                            svgIcon.SvgAllLogo({ width: styles.flagSize.width, height: styles.flagSize.height, fillColor: '#152e57' })
                          )}  
                          <Text style={[styles.dropdownText, selectedCenter === 'DEFAULT' && styles.activeDropdownText]}>ALL</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDropdownUserSelection('DGS')} 
                        disabled={selectedCenter === 'DGS'}
                        style={styles.touchableContainer}>
                        <View style={[
                          styles.dropdownItem,
                          selectedCenter === 'DGS' && styles.activeDropdownItem,
                        ]}>
                          {selectedCenter === 'DGS' ? (
                            svgIcon.SvgCore({ width: styles.flagSize.width, height: styles.flagSize.height, color: '#fff' })
                          ) : (
                            svgIcon.SvgCore({ width: styles.flagSize.width, height: styles.flagSize.height, color: '#152e57' })
                          )}                        
                          <Text style={[styles.dropdownText, selectedCenter === 'DGS' && styles.activeDropdownText]}>CORE</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.touchablesContainer}>
                      <TouchableOpacity onPress={() => handleDropdownUserSelection('DEALERS')} 
                        disabled={selectedCenter === 'DEALERS'}
                        style={styles.touchableloneContainer}>
                        <View style={[
                          styles.dropdownItem,
                          selectedCenter === 'DEALERS' && styles.activeDropdownItem,
                        ]}>
                          {selectedCenter === 'DEALERS' ? (
                            svgIcon.SvgDealer({ width: styles.flagSize.width, height: styles.flagSize.height, color: '#fff' })
                          ) : (
                            svgIcon.SvgDealer({ width: styles.flagSize.width, height: styles.flagSize.height, color: '#152e57' })
                          )}                         
                          <Text style={[styles.dropdownText, selectedCenter === 'DEALERS' && styles.activeDropdownText]}>DEALERS</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={toggleDurationModal}
            >
            {svgIcon.SvgStreamChannel({width: styles.flagSize.width, height: styles.flagSize.height})}
          </TouchableOpacity>  
          <Modal
            visible={showDurationModal}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleDurationModal}
          >
          <TouchableWithoutFeedback onPress={toggleDurationModal}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => { } }>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeaderContainer}>
                    {svgIcon.SvgStreamChannel({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
                    <Text style={styles.modalHeaderText}>Stream Channel</Text>
                    <TouchableOpacity onPress={toggleDurationModal} style={styles.closeStyle}>
                      {svgIcon.SvgClose({width: styles.CloseIconSize.width, height: styles.CloseIconSize.height})}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.touchablesContainer}>
                    <TouchableOpacity onPress={() => handleDropdownFeedSelection(false)} 
                      disabled={selectedFeed === false}
                      style={styles.touchableContainer}>
                      <View style={[styles.dropdownChannelItem, selectedFeed === false && styles.activeDropdownItem]}>
                      {selectedFeed === false ? (
                      svgIcon.SvgliveChannel({ width: styles.liveInternalIcon.width, height: styles.liveInternalIcon.height, color: '#fff' })
                      ) : (
                        svgIcon.SvgliveChannel({ width: styles.liveInternalIcon.width, height: styles.liveInternalIcon.height, color: '#152e57' })
                      )}                             
                      <Text style={[styles.dropdownFeedText, selectedFeed === false && styles.activeDropdownText]}>LIVE</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDropdownFeedSelection(true)} 
                      style={styles.touchableContainer}
                      disabled={selectedFeed === true}>
                      <View style={[styles.dropdownChannelItem, selectedFeed === true && styles.activeDropdownItem]}>
                      {selectedFeed === true ? (
                      svgIcon.SvgYesterday({ width: styles.liveInternalIcon.width, height: styles.liveInternalIcon.height, color: '#fff' })
                      ) : (
                        svgIcon.SvgYesterday({ width: styles.liveInternalIcon.width, height: styles.liveInternalIcon.height, color: '#152e57' })
                      )}                            
                        <Text style={[styles.dropdownFeedText, selectedFeed === true && styles.activeDropdownText]}>YESTERDAY</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal> 
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.dropdownLocationTrigger}
            onPress={toggleCallingModal}
          >
            {svgIcon.SvgWaitingCall({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
          </TouchableOpacity>
          <WaitingCallModal
            isVisible={showWaitingCall}
            closeModal={toggleCallingModal}
            data={null}
            updateTime={updateTime}
          />
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.dropdownAgentTrigger}
            onPress={toggleNotificationModal}
          >
            {svgIcon.SvgNotification({width: styles.flagIconSize.width, height: styles.flagIconSize.height})}
            {combineCount > 0 ? ( 
              <View style={styles.notification}>
                <View style={styles.notificationNumberStyle}>
                  <Text style={styles.notificationTitle}>{combineCount}</Text>
                </View>
              </View>
              ):''} 
          </TouchableOpacity>
          <AgentNotificationModal
            isVisible={showNotificationLogs}
            closeModal={toggleNotificationModal}
            data={agentData}
            updateTime={updateTime}
          />
        </View>
      </View> 
    ):('')}
    </>
  );
};

export default MainScreen;
