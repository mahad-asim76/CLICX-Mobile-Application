using Entities.Reporting.Pulse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Finances.Dealer_Commissions
{
    public class FinanceParams_DDL
    {
        public bool DefaultLoad { get; set; }
        public bool IsAffiliateChange { get; set; }
        public bool IsClientChange { get; set; }
        public string AffiliateIDs { get; set; }
        public string ClientIDs { get; set; }
        public string UserLoginID { get; set; }
        public string DgsAffiliateID { get; set; }
        public string Token { get; set; }
        public FinanceParams_DDL()
        {
            AffiliateIDs = string.Empty;
            ClientIDs = string.Empty;
            DgsAffiliateID = string.Empty;
        }
        public class FinanceParamBuilder
        {
            public FinanceParams_DDL DDLParams(string userID)
            {
                return new FinanceParams_DDL
                {
                    AffiliateIDs = "",
                    ClientIDs = "",
                    DefaultLoad = true,
                    IsAffiliateChange = false,
                    IsClientChange = false,
                    UserLoginID = userID
                };
            }
        }
        
    }
}
