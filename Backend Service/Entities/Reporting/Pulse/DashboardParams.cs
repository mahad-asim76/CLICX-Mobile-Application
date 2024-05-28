namespace Entities.Reporting.Pulse
{
    public class DashboardParams
    {
        public List<string> dealers { get; set; } 
        public string userID { get; set; }
        public bool isFilterData { get; set; } = false;
        public string customView { get; set; } = "DEFAULT";
        public List<object> skillSequence { get; set; }
        public List<object> fieldSequence { get; set; }
        public List<object> fieldSequenceTFN { get; set; }
        public List<object> fieldSequenceAdsCost { get; set; }
        public List<object> fieldSequenceCallStats15min { get; set; }
        public List<object> fieldSequence_TFNNew { get; set; }
        public YesterdayData yesterdayData { get; set; }
        public string location { get; set; } = "ALL";
        public Customization customization { get; set; }
    }

    public class Customization
    {
        public bool summary { get; set; } = true;
        public bool hourlySkill { get; set; } = true;
        public bool hourlyVDN { get; set; } = true;
        public bool quarterlySkill { get; set; } = true;
        public bool tfnStats { get; set; } = true;
        public bool agentActivity { get; set; } = true;
    }
    public class DashboardBuilder
    {
        public DashboardParams PostParams(List<string> dealerIDs, List<string> dealerNames, string userID, PostFilterParams Params)
        {
            var resultDict = new Dictionary<string, List<string>>
            {
                { "dealer ID", dealerIDs },
                { "dealerName", dealerNames }
            };

            return new DashboardParams
            {
                dealers = resultDict["dealer ID"],
                isFilterData = false,
                userID = userID.ToString(),
                customView = Params.View,
                skillSequence = Params.SkillName == "OVERALL" ? new List<object>() : new List<object> { Params.SkillName },
                fieldSequence = new List<object>(),
                fieldSequenceTFN = new List<object>(),
                fieldSequenceAdsCost = new List<object>(),
                fieldSequenceCallStats15min = new List<object>(),
                fieldSequence_TFNNew = new List<object>(),
                location = Params.Location,
                yesterdayData = new YesterdayData
                {
                    isYesterdayData = Params.Duration,
                    hour = Params.Hour,
                },
                customization = new Customization
                {
                    summary = true,
                    hourlySkill = true,
                    hourlyVDN = true,
                    quarterlySkill = true,
                    tfnStats = true,
                    agentActivity = true
                }
            };
        }
    }

}
