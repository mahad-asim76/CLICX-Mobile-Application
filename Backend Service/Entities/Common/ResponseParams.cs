using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Common
{
    public class ResponseParams
    {
        public bool valid { get; set; }
        public string UserID { get; set; }
        public string message { get; set; }
        public bool Enable_FinanceScreen { get; set; }
    }
}
