using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Otter.Infrastructure.Extensions
{
    public static class EnumerableExtensions
    {
        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            foreach (T obj in source)
            {
                action(obj);
            }
        }

        public static string ToCSV(this IList<string> source)
        {
            string result = string.Empty;
            if (source.Count > 0)
                result = source[0];
            for (int i = 1, n = source.Count; i < n; i++)
            {
                result += string.Format(",{0}", source[i]);
            }
            return result;
        }

        public static string ToCSV<T>(this IList<T> source, Func<T, string> selector)
        {
            string result = string.Empty;
            if (source.Count > 0)
                result = selector(source[0]);
            for (int i = 1, n = source.Count; i < n; i++)
            {
                result += string.Format(",{0}", selector(source[i]));
            }
            return result;
        }
    }
}
