using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Otter.Domain.Entities;

namespace Otter.Domain.Contracts
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        IList<Employee> GetLastUpdated(string lastUpdated);
        IList<Employee> GetLastUpdated(DateTime lastUpdated);
    }
}
