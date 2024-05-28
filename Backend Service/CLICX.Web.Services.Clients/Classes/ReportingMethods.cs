
using Newtonsoft.Json;
using Entities.Reporting.Pulse;
using LZStringCSharp;
using CLICX.Web.Service.Client.Clients;
using static Entities.Reporting.Pulse.userParams;
using static Entities.Reporting.Pulse.AgentLogsParams;
using static Entities.Reporting.Finances.Dealer_Commissions.FinanceParams_DDL;
using Entities.Reporting.Finances.Dealer_Commissions;
using static Entities.Reporting.Finances.Dealer_Commissions.InvoiceParams;
using static Entities.Reporting.Finances.Dealer_Commissions.FinanceUserParams;
using Entities.Common.Constants;

namespace CLICX.Web.Services.Clients.Services
{
    public class ReportingMethods
    {
        ServiceClient _ReportingAPI = new ServiceClient();
        ParamsUserBuilder userParamsBuilder = new ParamsUserBuilder();
        #region Pulse

        public async Task<string> PulseDashBoardData(string UserLoginId, PostFilterParams Params)
        {
            var userParams = JsonConvert.SerializeObject(userParamsBuilder.BuildUserParams(UserLoginId));
            string jsonData = await _ReportingAPI.GetDataAsync("LiveReporting", "GetAllDealersForPulse", userParams);
            var decompressedData = LZString.DecompressFromBase64(jsonData);
            var dealerInfo = JsonConvert.DeserializeObject<DealerData>(decompressedData);
            List<string> dealerIDs = dealerInfo.Table.Select(item => item.DealerID).ToList();
            List<string> dealerNames = dealerInfo.Table.Select(item => item.DealerName).ToList();
            DashboardBuilder dashboardBuilder = new DashboardBuilder();
            var jsonParams = JsonConvert.SerializeObject(dashboardBuilder.PostParams(dealerIDs, dealerNames, UserLoginId, Params));
            return await _ReportingAPI.GetDataAsync("LiveReporting", "BD_PulseMobile_DashBoard_Data", jsonParams);
        }

        public async Task<string> GetPulseAgentsLogs()
        {
            ParamsAgentBuilder agentBuilder = new ParamsAgentBuilder();
            var agentParams = JsonConvert.SerializeObject(agentBuilder.BuildAgentParams(AppConstants.ReportingConstants.maxAgentIndex));
            return await _ReportingAPI.GetDataAsync("LiveReporting", "BD_PulseDesktop_AgentsLogsNotification", agentParams);
        }

        #endregion

        #region Finances

        #region Dealer Commissions
        FinanceParamBuilder financeParam = new FinanceParamBuilder();
        public async Task<string> GetApprovedInvoice(string UserLoginId, InvoiceParams invoice)
        {
            InvoiceParamsBuilder invoiceParams = new InvoiceParamsBuilder();
            var DDLParams = JsonConvert.SerializeObject(financeParam.DDLParams(UserLoginId));
            string jsonData = await _ReportingAPI.GetDataAsync("Finance", "BDCommissionDDL", DDLParams);

            var decompressedData = LZString.DecompressFromBase64(jsonData);
            Finance_Dropdown finance_Dropdown = JsonConvert.DeserializeObject<Finance_Dropdown>(decompressedData);

            string dealers = string.Empty;
            foreach (var x in finance_Dropdown.Dealers)
            {
                dealers = dealers + x.Id + ",";
            }
            if (dealers.Length > 0)
            {
                dealers = dealers.Substring(0, dealers.Length - 1);
            }
            var InvoiceParams = JsonConvert.SerializeObject(invoiceParams.BuildParams(invoice.startDate, invoice.EndDate, dealers, "Approved"));
            return await _ReportingAPI.GetDataAsync("Finance", "BDCommissionGetApprovedInvoice", InvoiceParams);
        }

        public async Task<string> GetCommissionDDL(string UserLoginId)
        {
            var DDLParams = JsonConvert.SerializeObject(financeParam.DDLParams(UserLoginId));
            return await _ReportingAPI.GetDataAsync("Finance", "BDCommissionDDL", DDLParams);
        }

        public async Task<string> GetPreviousInvoice(InvoiceParams invoice)
        {
            InvoiceParamsBuilder invoiceParams = new InvoiceParamsBuilder();
            var InvoiceParams = JsonConvert.SerializeObject(invoiceParams.BuildParams(invoice.startDate, invoice.EndDate, invoice.Dealer, invoice.Type));
            return await _ReportingAPI.GetDataAsync("Finance", "BDCommissionGetApprovedInvoice", InvoiceParams);
        }
        public async Task<bool> BD_Commission_VerifyAuthentication(string UserID)
        {
            FinanceUserBuilder userParamsBuilder = new FinanceUserBuilder();
            var response = await _ReportingAPI.GetDataAsync("Finance", "BDCommissionVerifyAuthentication", JsonConvert.SerializeObject(userParamsBuilder.BuildUserParams(UserID)));
            var responseData = LZString.DecompressFromBase64(response);
            bool EnableScreen = JsonConvert.DeserializeObject<bool>(responseData);
            return EnableScreen;
        }

        #endregion

        #endregion
    }
}
