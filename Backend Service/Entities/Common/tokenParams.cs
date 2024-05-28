using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Common
{
    public class tokenParams
    {
        public string JsonToken { get; set; }
        public tokenParams()
        {
            JsonToken = string.Empty;
        }
    }
}
