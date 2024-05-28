using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Reporting.Pulse
{
    public class AgentLogsParams
    {
        public string maxLoginIndex { get; set; }
        public string maxLogoutIndex { get; set; }

        public AgentLogsParams()
        {
            maxLoginIndex = string.Empty;
            maxLogoutIndex = string.Empty;
        }
        public class ParamsAgentBuilder
        {
            public AgentLogsParams BuildAgentParams(string userID)
            {
                return new AgentLogsParams
                {
                    maxLoginIndex = userID,
                    maxLogoutIndex = userID
                };
            }
        }
    }
}
