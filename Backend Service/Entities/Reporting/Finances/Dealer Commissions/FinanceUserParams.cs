using Entities.Reporting.Pulse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Finances.Dealer_Commissions
{
    public class FinanceUserParams
    {
        public string userloginID { get; set; }
        public FinanceUserParams()
        {
            userloginID = string.Empty;
        }
        public class FinanceUserBuilder
        {
            public FinanceUserParams BuildUserParams(string userloginID)
            {
                return new FinanceUserParams
                {
                    userloginID = userloginID
                };
            }
        }
    }
}
