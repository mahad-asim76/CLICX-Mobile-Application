using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Finances.Dealer_Commissions
{
    public class Finance_Dropdown
    {
        public List<Dealer> Dealers { get; set; }
    }

    public class Dealer
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
