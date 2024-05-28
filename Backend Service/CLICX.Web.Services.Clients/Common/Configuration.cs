using Microsoft.Extensions.Configuration;

namespace CLICX.Web.Service.Clients.Common
{
    public class Configuration
    {
        #region IConfiguration services

        private static IConfiguration? _configuration;

        public Configuration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private static string GetApplicationConfiguration(string config) => _configuration.GetSection("appSettings")[config];

        #endregion
        public static string ApplicationMode => GetApplicationConfiguration("ApplicationMode");
        private static string BDReportingServiceEnvironment => GetApplicationConfiguration("BDReportingServiceEnvironment");
        public static string BDReportingServiceUrl =>
            BDReportingServiceEnvironment == "P" ? GetApplicationConfiguration("BDReportingServiceProductionUrl") :
            GetApplicationConfiguration("BDReportingServiceLocalUrl");
        public static string SecretKey => GetApplicationConfiguration("secretKey");

        private static string enableCache = String.Empty;
        public static string EnableCache
        {
            get
            {
                if (string.IsNullOrEmpty(enableCache))
                    enableCache = GetApplicationConfiguration("EnableCache");

                return enableCache;
            }
        }
    }
}
