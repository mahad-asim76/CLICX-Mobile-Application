namespace Entities.Reporting.Pulse
{
    public class PulseFilterParams
    {
        public List<string> dealers { get; set; }
        public bool isFilteredData { get; set; }
        public string userLoginId { get; set; }
        public string customView { get; set; } 
        public bool getPreference { get; set; }
        public bool isComparisonView { get; set; }
        public bool isMobile { get; set; }
        public bool isCampaignsRequestOnly { get; set; }
        public string location { get; set; } 
        public YesterdayData yesterdayData { get; set; } 
    }

    public class YesterdayData
    {
        public bool isYesterdayData { get; set; } = false;
        public int hour { get; set; } = 13;
    }

    public class DealerData
    {
        public List<DealerItem> Table { get; set; }
        public List<DealerItem> Table1 { get; set; }
    }

    public class DealerItem
    {
        public string DealerID { get; set; }
        public string DealerName { get; set; }
    }
    public class ParamsBuilder
    {
        public PulseFilterParams BuildParams(List<string> dealerIDs, List<string> dealerNames, string user_login_id)
        {
            var resultDict = new Dictionary<string, List<string>>
            {
                { "dealer ID", dealerIDs },
                { "dealerName", dealerNames }
            };

            return new PulseFilterParams
            {
                dealers = resultDict["dealer ID"],
                isFilteredData = false,
                userLoginId = user_login_id,
                customView = "DEFAULT",
                getPreference = true,
                isComparisonView = false,
                isMobile = true,
                isCampaignsRequestOnly = true,
                location = "ALL",
                yesterdayData = new YesterdayData
                {
                    isYesterdayData = false,
                    hour = 13
                }
            };
        }
    }
}