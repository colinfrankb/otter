using Otter.Domain.Contracts;
using Otter.Domain.Entities;
using NHibernate;
using System.Collections.Generic;
using System;
using NHibernate.LambdaExtensions;

namespace Otter.Infrastructure.Implementation
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ISession session)
            : base(session)
        { }

        public IList<Employee> GetLastUpdated(string lastUpdated)
        {
            return GetLastUpdated(Convert.ToDateTime(lastUpdated));
        }

        public IList<Employee> GetLastUpdated(DateTime lastUpdated)
        {
            var criteria = Session.CreateCriteria<Employee>().Add<Employee>(x => x.LastUpdated > lastUpdated);
            return criteria.List<Employee>();
        }
    }
}
