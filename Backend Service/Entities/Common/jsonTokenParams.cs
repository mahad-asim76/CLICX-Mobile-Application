using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Common
{
    public class jsonTokenParams
    {
        public string accessToken { get; set; }
        public string macAddress { get; set; }
        public string UserLoginID { get; set; }
        public string Platform { get; set; }

        public jsonTokenParams()
        {
            accessToken = string.Empty;
            macAddress = string.Empty;
        }
    }
}
