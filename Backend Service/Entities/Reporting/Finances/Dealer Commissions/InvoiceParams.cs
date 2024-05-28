using Entities.Reporting.Pulse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Finances.Dealer_Commissions
{
    public class InvoiceParams
    {
        public string? startDate { get; set; }
        public string? EndDate { get; set; }
        public string? Dealer { get; set; }
        public string? Type { get; set; }
        public string JsonToken { get; set; }
        public InvoiceParams()
        {
            startDate = string.Empty;
            EndDate = string.Empty;
            Dealer = string.Empty;
            Type = string.Empty;
        }
        public class InvoiceParamsBuilder
        {
            public InvoiceParams BuildParams(string startDate, string EndDate, string Dealers, string Type)
            {
                return new InvoiceParams
                {
                    startDate = startDate,
                    EndDate = EndDate,
                    Dealer = Dealers,
                    Type = Type,
                };
            }
        }
       
    }
}
