using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Otter.Infrastructure.Extensions
{
    public static class StringExtensions
    {
        public static string MakeSqlSafe(this string value)
        {
            string result = value.Replace("'", "''");
            result = result.Replace("{", string.Empty);
            result = result.Replace("}", string.Empty);
            result = result.Replace("(", string.Empty);
            result = result.Replace(")", string.Empty);
            result = result.Replace("[", string.Empty);
            result = result.Replace("]", string.Empty);
            result = result.Replace("*/", string.Empty);
            result = result.Replace("/*", string.Empty);
            return result;
        }
    }
}
