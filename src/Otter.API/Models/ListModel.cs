using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Otter.API.Models
{
    public class ListModel<T> where T : class
    {
        public ApiCallResult Result { get; set; }
        public IList<T> Items { get; set; }
        public string LastUpdated { get; set; }
        public bool HasMore { get; set; }
        public int NextOffset { get; set; }
    }
}