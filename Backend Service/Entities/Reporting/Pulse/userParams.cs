using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Pulse
{
    public class userParams
    {
        public string userID { get; set; }
        public userParams()
        {
            userID = string.Empty;
        }
        public class ParamsUserBuilder
        {
            public userParams BuildUserParams(string userloginID)
            {
                return new userParams
                {
                    userID = userloginID
                };
            }
        }
    }
}
