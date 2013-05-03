using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Burrow;

namespace Otter.Infrastructure
{
    public sealed class NHibernateHelper
    {
        public static ISession GetCurrentSession()
        {
            return new BurrowFramework().GetSession();
        }

        public static ISessionFactory GetCurrentSessionFactory()
        {
            return new BurrowFramework().GetSessionFactory("PersistenceUnit1");
        }
    }
}
