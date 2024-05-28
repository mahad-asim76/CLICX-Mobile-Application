import React, {useState, useEffect, useRef} from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { Dimensions, View, ScrollView, TextInput, Platform, Image, TouchableHighlight, KeyboardAvoidingView,
   TouchableOpacity, Text, Modal} from 'react-native';
import RNPickerSelect  from 'react-native-picker-select';
import ServiceClient from '../../../../ClientService/ClientAPI.js';
import styles from '../../../../../Themes/Default Theme/Reporting/Finances/Dealer Commissions/DealerCommissionsStyle.js'
import * as SVGIcon from '../../../../../Themes/SVG Icons/svgFinanceComponent.js'
import * as SupportMethods from '../../../../ClientService/SupportMethods.js';
import * as Constants from '../../../../Common/Constants.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as svgIcon from '../../../../../Themes/SVG Icons/svgPulseComponent';
import LZString from 'lz-string'
import transparentLoadingGif from '../../../../../assets/loading_animation.gif'

const MainScreen = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [Dealer, setDealer] = useState([]);
  const [selectedDealers, setSelectedDealers] = useState([]);
  const [showStartPicker, setStartShowPicker] = useState(false);
  const [showEndPicker, setEndShowPicker] = useState(false);
  const [status, setStatus] = useState('Approved');
  const [invoiceError, setInvoiceError] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 1000); 
  const serviceClient = new ServiceClient();
  const [endDate, setEndDate] = useState(new Date());
  const [StartDate, setStartDate] = useState(startDate);
  const autoRefreshEnabledRef = useRef(true);

  useEffect(() => {
    const invoiceData = async () => {  
      try {
        setIsLoading(true);     
        const InvoiceParams = await SupportMethods.invoiceParams(startDate, today)
        const response = await serviceClient.getDataAsync(Constants.Reporting,Constants.DealerCommissions.ApprovedInvoice,InvoiceParams)
        const Data = response.value;
        if(Data.success) {
          const invoice_Data = JSON.parse(LZString.decompressFromBase64(Data.data));
          setInvoiceData(invoice_Data);
          setFilterData(invoice_Data);
        }
      } catch (error) {
        setIsLoading(false);
      } finally{
        setIsLoading(false);
      }
    };

    const DealerData = async () => {     
      const response = await serviceClient.getDataAsync(Constants.Reporting, Constants.DealerCommissions.DealerDD, await SupportMethods.tokenParam())
      const Data = response.value;
      if(Data.success) {
        const dealer_Data = JSON.parse(LZString.decompressFromBase64(Data.data));
        setDealer(dealer_Data.Dealers);
      }
    };

    if(autoRefreshEnabledRef.current){
      invoiceData();
      DealerData();
    }
  }, []);

  const GetPreviousInvoices = async () => {
    if (endDate.toISOString().split('T')[0] < StartDate.toISOString().split('T')[0]){
      setInvoiceError('Invalid Date Selection')
      
    }
    else if (selectedDealers.length == 0){
      setInvoiceError('No Dealer Selected')
    } 
    else {
      try {
        autoRefreshEnabledRef.current=false;
        setModalVisible(false);
        setIsLoading(true);     
        const previousParams = await SupportMethods.previousInvoiceParams(StartDate, endDate, getSelectedDealersNames(), status)
        const response = await serviceClient.getDataAsync(Constants.Reporting,Constants.DealerCommissions.PreviousInvoice,previousParams)
        const Data = response.value;
        if(Data.success) {
          const invoice_Data = JSON.parse(LZString.decompressFromBase64(Data.data));
          setInvoiceData(invoice_Data);
          setFilterData(invoice_Data);
        }
      } catch (error) {
        setIsLoading(false);
      } finally{
        setSelectedDealers([])
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      setInvoiceError('');
    }, 3000);
  };

  const statusOptions = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Submitted', value: 'Submitted' },
  ];

  const handleDealerSelection = (selectedItems) => {
    setSelectedDealers(selectedItems);
  };

  const getSelectedDealersNames = () => {
    return selectedDealers.map(dealerName => {
      const selectedDealer = Dealer.find(dealer => dealer.Name === dealerName);
      return selectedDealer ? selectedDealer.Id : '';
    }).join(', ');
  };

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartShowPicker(false); 
    setStartDate(currentDate);
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndShowPicker(false); 
    setEndDate(currentDate);
  };

  const showStartDateTimePicker = () => {
    setStartShowPicker(true);
  };

  const showEndDateTimePicker = () => {
    setEndShowPicker(true);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const closeCommissionsModal = () =>{
    setModalVisible(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = filterData.filter((item) => {
      return (
        item.InvoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
        item.Approver_Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Requester_Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Approval_Status.toLowerCase().includes(query.toLowerCase())
      );
    })
    setInvoiceData(filtered);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const settingsPopup = () => {
    setModalVisible(true);
  };

  function getDaysDiff(invoiceNumber) {
    const datePart = invoiceNumber.split("/").slice(-3).join("/").split("-")[0].split('/');
    const invoiceDate = new Date(datePart[0], datePart[1] - 1, datePart[2]);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - invoiceDate;
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  }

  const placeholder = {
    label: 'Select Status',
    value: 'null',
  };

  const invoiceScreen = (invoiceName) => {
    const invoice = invoiceData.find(invoice => invoice.InvoiceNumber === invoiceName);
    navigation.navigate('DealerInvoice', { invoiceData: invoice });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Image source={transparentLoadingGif} style={styles.loadingGif} />
          </View>
        )}
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, isSearchFocused && styles.focusedInput]}
            placeholder="Search..."
            onChangeText={handleSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            value={searchQuery} />
          <TouchableOpacity onPress={settingsPopup} disabled={invoiceData.length <= 0}>
            {SVGIcon.SvgSettings({ width: styles.iconSize.width, height: styles.iconSize.height })}
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{invoiceData.length} Commissions Found</Text>
        </View>
        {(invoiceData.length > 0 || invoiceData == null ? (
          <ScrollView>
            {invoiceData.map((data, index) => (
              <TouchableHighlight key={index} onPress={invoiceScreen.bind(this, data.InvoiceNumber)} underlayColor='rgba(169, 216, 139, 0.8)'>
                <View style={[styles.bodyContainer, { backgroundColor: index % 2 === 0 ? 'rgba(169, 216, 139, 0.2)' : 'rgba(169, 216, 139, 0.4)' }]}>
                  <Text style={styles.bodyTextBold}>{data.InvoiceNumber}</Text>
                  <Text style={styles.bodyTextStyle}>Commission was Assigned to <Text style={styles.bodyTextBold}>{data.Approver_Name}</Text> by <Text style={styles.bodyTextBold}>{data.Requester_Name}</Text>, and is now in approved state.</Text>
                  <View style={styles.statusDateContainer}>
                    <View style={[styles.statusContainer, { backgroundColor: data.Approval_Status === 'Approved' ? 'rgb(0, 128, 0)' : '#FF0000' }]}>
                      <Text style={styles.statusText}>{data.Approval_Status}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Text style={styles.bodyTextItalic}>{getDaysDiff(data.InvoiceNumber)} days ago</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        ) : (
          isLoading ? null : (
            <View style={styles.emptyDataRow}>
              {svgIcon.SvgNoData({ width: styles.flagIconSize.width, height: styles.flagIconSize.height })}
            </View>
          )
        ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={false}
        onRequestClose={closeCommissionsModal}
      >
      <View style={styles.invoiceBackground}>
        <View style={styles.invoiceMainContainer}>
          <View style={styles.invoiceTitleContainer}>
            <Text style={styles.modalTitle}>Get Commissions</Text>
            <TouchableOpacity onPress={closeCommissionsModal} style={styles.closeStyle}>
              {svgIcon.SvgClose({ width: styles.CloseIconSize.width, height: styles.CloseIconSize.height })}
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.iosSpecificContainer}>
              <MultipleSelectList
                setSelected={(val) => handleDealerSelection(val)}
                search={false}
                data={Dealer.map(item => ({ value: item.Name, label: item.Id }))}
                placeholder='Select Dealers'
                inputStyles={{ fontSize: 16 }}
                dropdownTextStyles={{ fontSize: 14 }}
                label={selectedDealers.length > 1 ? `${selectedDealers.length} Dealers` : selectedDealers.length === 1 ? selectedDealers[0] : 'Select Dealers'}
                labelStyles={{ display: 'flex', fontSize: 16, height: (Dimensions.get('screen').height) * 0.02, color:'rgb(169, 216, 139)' }}
                badgeStyles={{ display: 'none' }}
                disabledCheckBoxStyles={false}
                fontFamily='Poppins-Regular'
                boxStyles={{borderWidth: 1, borderColor: 'rgb(169, 216, 139)'}}
                dropdownStyles={{ height: (Dimensions.get('screen').height) * 0.25, position: 'absolute', top: '100%', zIndex: 2, backgroundColor: '#fff', width: '100%', alignContent: 'center' }} />
            </View>
            <RNPickerSelect
              items={statusOptions}
              placeholder={placeholder}
              onValueChange={(value) => handleStatusChange(value)}
              value={status}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  fontSize: 16,
                  color: 'rgb(169, 216, 139)',
                  fontFamily: 'Poppins-Regular',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderWidth: 0.8,
                  borderColor: 'rgb(169, 216, 139)'
                },
                inputIOS: {
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                  paddingHorizontal: 20,
                  color: 'rgb(169, 216, 139)',
                  paddingVertical: 10,
                  borderRadius: 4,
                  borderWidth: 0.8,
                  borderColor: 'rgb(169, 216, 139)'
                },
                placeholder: {
                  color: '#000'
                },
              }}
              Icon={() => {
                return (
                  <View style={{ paddingRight: 25, paddingVertical: 15 }}>
                    {svgIcon.SvgCaretDown({ width: styles.CaretSize.width, height: styles.CaretSize.height })}
                  </View>
                );
              } } />
            <View style={styles.dateTimePickerContainer}>
              <TouchableHighlight onPress={showStartDateTimePicker} style={styles.dateTimeContainer} underlayColor='transparent'>
                <Text style={styles.dateFont}>{StartDate.toISOString().split('T')[0]}</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={showEndDateTimePicker} style={styles.dateTimeContainer} underlayColor='transparent'>
                <Text style={styles.dateFont}>{endDate.toISOString().split('T')[0]}</Text>
              </TouchableHighlight>
            </View>
            <Button mode="contained"
              style={styles.button}
              onPress={GetPreviousInvoices}
              disabled={isLoading}
            >
              <Text style={styles.buttontxt}>{'Get Report'}</Text>
            </Button>
            <Text style={styles.errorText}>{invoiceError}</Text>
          </View>
        </View>
      </View>
      {Platform.OS === 'ios' && (
        <View style={{position: 'absolute', backgroundColor: '#fff', bottom: 0, right: 0, left: 0}}>
        {showStartPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={StartDate}
            mode="date"
            minimumDate={new Date(1950, 0, 1)}
            maximumDate={new Date(2050, 10, 20)}
            is24Hour={true}
            display="inline"
            onChange={onStartChange} />
        )}
        {showEndPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode="date"
            minimumDate={new Date(1950, 0, 1)}
            maximumDate={new Date(2050, 10, 20)}
            is24Hour={true}
            display="inline"
            onChange={onEndChange} />
        )}
      </View>
      )}

    </Modal>
    {Platform.OS != 'ios' && (
      <>
        {showStartPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={StartDate}
            mode="date"
            minimumDate={new Date(1950, 0, 1)}
            maximumDate={new Date(2050, 10, 20)}
            is24Hour={true}
            display="calendar"
            onChange={onStartChange}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode="date"
            minimumDate={new Date(1950, 0, 1)}
            maximumDate={new Date(2050, 10, 20)}
            is24Hour={true}
            display="calendar"
            onChange={onEndChange}
          />
        )}
      </>
    )}
    </KeyboardAvoidingView>
  );
};

export default MainScreen;