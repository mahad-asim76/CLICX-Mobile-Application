import React, {useState} from 'react';
import { Modal, ScrollView, View, TouchableOpacity, Text} from 'react-native';
import * as svgIcon from '../../../../../Themes/SVG Icons/svgPulseComponent';
import * as SVGIcon from '../../../../../Themes/SVG Icons/svgFinanceComponent.js'
import * as svgicon from '../../../../../Themes/SVG Icons/svgFooterComponent.js';
import styles from '../../../../../Themes/Default Theme/Reporting/Finances/Dealer Commissions/DealerInvoiceStyle.js';
import * as invoicePopup from './InvoicePopup.js';
import Analytics from './Analytics.js';

const DealerInvoice = ({ route }) => {
  const [defaultCommissionVisible, setDefaultCommissionVisible] = useState(false);
  const [CommissionVisible, setCommissionVisible] = useState(false);
  const [OtherCommissionVisible, setOtherCommissionVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('DealerCommissionsHome'); 
  const [OnHoldCommissionVisible, setOnHoldCommissionVisible] = useState(false);
  const [ChargeBackCommissionVisible, setChargeBackCommissionVisible] = useState(false);
  const data = route.params ? route.params.invoiceData : null;
  
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

  const switchToDealerCommissions = () => {
    setActiveTab('DealerCommissionsHome');
  };
  
  const switchToAnalytics = () => {
    setActiveTab('AnalyticsHome');
  };

  const InvoiceModal = () => setDefaultCommissionVisible(!defaultCommissionVisible);
  const DefaultInvoiceModal = () => setCommissionVisible(!CommissionVisible);
  const OtherInvoiceModal = () => setOtherCommissionVisible(!OtherCommissionVisible);
  const OnHoldInvoiceModal = () => setOnHoldCommissionVisible(!OnHoldCommissionVisible);
  const ChargeBackInvoiceModal = () => setChargeBackCommissionVisible(!ChargeBackCommissionVisible);

  return (
    <>
      {activeTab === 'DealerCommissionsHome' && (
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{data.InvoiceNumber}</Text>
            </View>
            <ScrollView style={styles.invoiceContainer}>
              <View style={styles.touchablesContainer}>
                <TouchableOpacity style={styles.touchableContainer} onPress={InvoiceModal} disabled={data.Detailed_Invoice.NetCommission.TotalAmount <= 0}>
                  {SVGIcon.SvgHoldingDollarHand({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.NetCommission.TotalAmount)}</Text>
                  <View style={styles.commissionContainer}>
                    <View style={styles.rowContent}>
                      <Text style={styles.commissionsTitle}>Net Commission</Text>
                      {data.Detailed_Invoice.NetCommission.TotalAmount > 0 && (
                        <View style={styles.exclamationStyle}>
                          {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                        </View>
                      )}
                    </View>
                    <Text style={styles.commissionsTitle}>Paid <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.NetCommission.Paid)}</Text></Text>
                    <Text style={styles.commissionsTitle}>Payable <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.NetCommission.UnPaid)}</Text></Text>
                  </View>
                </TouchableOpacity>
                {data.Detailed_Invoice.NetCommission.TotalAmount !== null && data.Detailed_Invoice.NetCommission !== null && (
                  invoicePopup.NetCommission_Popup(defaultCommissionVisible, InvoiceModal, data.Detailed_Invoice, "Dealer Net Commission")
                )}
                <TouchableOpacity style={styles.touchableContainer} onPress={DefaultInvoiceModal} disabled={data.Detailed_Invoice.DefaultCommission.TotalAmount <= 0}>
                  {SVGIcon.SvgDollarSign({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.DefaultCommission.TotalAmount)}</Text>
                  <View style={styles.commissionContainer}>
                    <View style={styles.rowContent}>
                      <Text style={styles.commissionsTitle}>Default Commission</Text>
                      {data.Detailed_Invoice.DefaultCommission.TotalAmount > 0 && (
                        <View style={styles.exclamationStyle}>
                          {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                        </View>
                      )}
                    </View>
                    <Text style={styles.commissionsTitle}>Paid <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.DefaultCommission.Paid)}</Text></Text>
                    <Text style={styles.commissionsTitle}>Payable <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.DefaultCommission.UnPaid)}</Text></Text>
                  </View>
                </TouchableOpacity>
                {data.Detailed_Invoice.DefaultCommission.TotalAmount !== null && data.Detailed_Invoice.DefaultCommission !== null && (
                  invoicePopup.DefaultCommission_Popup(CommissionVisible, DefaultInvoiceModal, data.Detailed_Invoice.DefaultCommission)
                )}
              </View>
              <View style={styles.touchablesContainer}>
                <View style={styles.touchableContainer}>
                  {SVGIcon.SvgMoneyBill({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.PlatformCharges.TotalAmount)}</Text>
                  <View style={styles.commissionContainer}>
                    <Text style={styles.commissionsTitle}>Platform Charges</Text>
                    <Text style={styles.commissionsTitle}>Paid <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.PlatformCharges.Paid)}</Text></Text>
                    <Text style={styles.commissionsTitle}>Payable <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.PlatformCharges.UnPaid)}</Text></Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.touchableContainer} onPress={OtherInvoiceModal}>
                  {SVGIcon.SvgInvoiceReceipt({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.OthersCommission.TotalAmount)}</Text>
                  <View style={styles.commissionContainer}>
                    <View style={styles.rowContent}>
                      <Text style={styles.commissionsTitle}>Others Commission</Text>
                      <View style={styles.exclamationStyle}>
                        {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                      </View>
                    </View>
                    <Text style={styles.commissionsTitle}>Paid <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.OthersCommission.Paid)}</Text></Text>
                    <Text style={styles.commissionsTitle}>Payable <Text style={styles.paidAmountTitle}>${formatAmount(data.Detailed_Invoice.OthersCommission.UnPaid)}</Text></Text>
                  </View>
                </TouchableOpacity>
                {data.Detailed_Invoice.OthersCommission.TotalAmount !== null && data.Detailed_Invoice.OthersCommission.Invoice_Detail_Object !== null && (
                  invoicePopup.OthersCommission_Popup(OtherCommissionVisible, OtherInvoiceModal, data.Detailed_Invoice.OthersCommission)
                )}
              </View>
              <View style={styles.touchablesContainer}>
                <TouchableOpacity style={styles.touchableContainer} onPress={OnHoldInvoiceModal} disabled={data.Detailed_Invoice.OnHold.TotalAmount <= 0}>
                  {SVGIcon.SvgPause({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.OnHold.TotalAmount)}</Text>
                  <View style={styles.rowContent}>
                    <Text style={styles.commissionsTitle}>On Hold</Text>
                    {data.Detailed_Invoice.OnHold.TotalAmount > 0 && (
                      <View style={styles.exclamationStyle}>
                        {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {data.Detailed_Invoice.OnHold.TotalAmount !== null && data.Detailed_Invoice.OnHold !== null && (
                  invoicePopup.OnHold_Popup(OnHoldCommissionVisible, OnHoldInvoiceModal, data.Detailed_Invoice.OnHold)
                )}
                <View style={styles.touchableContainer}>
                  {SVGIcon.SvgFilterDollar({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.ForecastedCommission.TotalAmount)}</Text>
                  <View style={styles.commissionContainer}>
                    <Text style={styles.commissionsTitle}>Forecasted Commission</Text>
                  </View>
                </View>
              </View>
              <View style={styles.touchablesContainer}>
                <TouchableOpacity style={styles.touchableContainer} onPress={ChargeBackInvoiceModal} disabled={data.Detailed_Invoice.ChargeBack.TotalAmount <= 0}>
                  {SVGIcon.SvgMoneyCheque({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.ChargeBack.TotalAmount)}</Text>
                  <View style={styles.rowContent}>
                    <Text style={styles.commissionsTitle}>Charge Back</Text>
                    {data.Detailed_Invoice.ChargeBack.TotalAmount > 0 && (
                      <View style={styles.exclamationStyle}>
                        {svgIcon.SvgExclamation({ width: styles.agentIconSize.width, height: styles.agentIconSize.height })}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {data.Detailed_Invoice.DefaultCommission.TotalAmount !== null && data.Detailed_Invoice.DefaultCommission !== null && (
                  invoicePopup.ChargeBack_Popup(ChargeBackCommissionVisible, ChargeBackInvoiceModal, data.Detailed_Invoice.ChargeBack)
                )}
                <View style={styles.touchableContainer}>
                  {SVGIcon.SvgCaution({ width: styles.flagSize.width, height: styles.flagSize.height })}
                  <Text style={styles.amountTitle}>${formatAmount(data.Detailed_Invoice.DisputedCommission.TotalAmount)}</Text>
                  <View style={styles.commissionContainer}>
                    <Text style={styles.commissionsTitle}>Disputed Commission</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {activeTab === 'AnalyticsHome' && (
        <Analytics dateName = {data.InvoiceNumber}
          Data={data.Detailed_Invoice}/>
      )}
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={switchToDealerCommissions}
          >
            {activeTab === 'DealerCommissionsHome' ? (
              svgicon.SvgFinanceHome({ width: styles.footerSize.width, height: styles.footerSize.height, color: "#FFBF39" })
            ) : (svgicon.SvgFinanceHome({ width: styles.footerSize.width, height: styles.footerSize.height, color: '#fff' }))}
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={switchToAnalytics}
          >
            {activeTab === 'AnalyticsHome' ? (
              svgicon.SvgAnalytics({ width: styles.footerSize.width, height: styles.footerSize.height, color: "#FFBF39" })
            ) : (svgicon.SvgAnalytics({ width: styles.footerSize.width, height: styles.footerSize.height, color: '#fff' }))}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DealerInvoice;
