using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Pulse
{
    public class AuthorizeParams
    {
        public string sessionID { get; set; }
        public string macAddress { get; set; }
        public AuthorizeParams()
        {
            sessionID = string.Empty;
            macAddress = string.Empty;
        }
        public class AuthorizeBuilder
        {
            public AuthorizeParams BuildParams(string sessionID, string macAddress)
            {
                return new AuthorizeParams
                {
                    sessionID = sessionID,
                    macAddress = macAddress
                };
            }
        }
    }
}
