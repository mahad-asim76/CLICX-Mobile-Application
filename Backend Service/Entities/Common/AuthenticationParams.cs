namespace Entities.Common
{
    public class UserAuthentication
    {
        public bool Authorize { get; set; }
        public string UserID { get; set; }
        public string status { get; set; }

        public UserAuthentication()
        {
            Authorize = false;
            UserID = string.Empty;
            status = "401";
        }
    }
    public class AuthenticationParams
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public DeviceInfo DeviceInfo { get; set; }
        public AuthenticationParams()
        {
            Username = string.Empty;
            Password = string.Empty;
            DeviceInfo = new DeviceInfo();
        }
    }

    public class DeviceInfo
    {
        public string MacAddress { get; set; }
        public string OperatingSystem { get; set; }
        public string DeviceName { get; set; }
        public string LastAccessedLocation { get; set; }

        public DeviceInfo()
        {
            MacAddress = string.Empty;
            OperatingSystem = string.Empty;
            DeviceName = string.Empty;
            LastAccessedLocation = string.Empty;
        }
    }


}
