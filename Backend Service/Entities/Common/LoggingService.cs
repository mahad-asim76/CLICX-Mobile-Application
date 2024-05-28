using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Entities.Common
{
    public static class LoggingService
    {
        public static ILogger Logger { get; set; }

        static LoggingService()
        {
            Logger = new LoggerConfiguration()
                .WriteTo.File($"logs\\logs.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();
        }
    }
}
