using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Common.Constants
{
    public struct AppConstants
    {
        public struct DataHolderContents
        {
            public static readonly string LoginUser = "LoginUser";
            public static readonly string LoginUserID = "UserID";
        }
        public struct UserAuthentication
        {
            public static readonly string SessionID = "sessionid";
            public static readonly string SessionExpiryDate = "sessionend";
            public static readonly string NoTokenFound = "Token not found";
        }

        public struct Platforms
        {
            public static readonly string Web = "web";
        }

        public struct ReportingConstants
        {
            public static readonly string maxAgentIndex = "0";
        }
        public struct CacheConstants
        {
            public static readonly string ConnectionString = "127.0.0.1:6379, defaultDatabase=1";
            public static readonly string CacheSerializeSuccess = "Value is set in the cache with key ";
            public static readonly string CacheSerializeError = "Error setting DataSet value in the cache with key ";
            public static readonly string NoDataForKey = "Cache miss for key ";
            public static readonly string CacheDeserializeError = "Error deserializing DataSet value from cache for key ";
            public static readonly string CacheDeserializeSuccess = "Deserialized DataSet value from cache for key ";
            public static readonly string CacheCurrentMemoryAllocated = "Total memory allocated to Redis: {0} ";
            public static readonly string CacheCurrentMemoryUsage = "Redis memory being used: {0} ";
            public static readonly string Data = "MongoDBFieldName";
            public static readonly string UniqueKey = "SessionUniqueKey";
            public static readonly int CacheTimeout = 30; //minute
        }
    }
}
