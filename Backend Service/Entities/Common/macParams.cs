using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Common
{
    public class macParams
    {
        public string macAddress {  get; set; }
        public macParams() 
        {
            macAddress = string.Empty;
        }
    }
}
