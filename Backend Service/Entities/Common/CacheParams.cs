using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Common
{
    public class CacheParams
    {
        public StringBuilder totalCacheMemoryAllocated { get; set; }
        public StringBuilder totalCacheMemoryUsed { get; set; }

        public CacheParams()
        {
            totalCacheMemoryAllocated = new StringBuilder();
            totalCacheMemoryUsed = new StringBuilder();
        }
    }
}
