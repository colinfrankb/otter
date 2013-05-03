using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Otter.API.Models;
using Otter.Domain.Contracts;
using Otter.Infrastructure.Implementation;
using Otter.Infrastructure;
using Otter.Domain.Entities;

namespace Otter.API.Controllers
{
    public class EmployeeController : ApiController
    {
        private IEmployeeRepository _employeeRepository;

        public EmployeeController()
        {
            _employeeRepository = new EmployeeRepository(NHibernateHelper.GetCurrentSession());
        }

        [HttpGet]
        public ListModel<EmployeeModel> GetEmployees()
        {
            return new ListModel<EmployeeModel>()
            {
                Items = _employeeRepository.FindAll().Select(x => (EmployeeModel)x).ToList(),
                LastUpdated = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss")
            };
        }

        [HttpGet]
        public ListModel<EmployeeModel> GetLastUpdated(string lastUpdated)
        {
            var lastUpdatedEmployees = _employeeRepository.GetLastUpdated(lastUpdated);
            return new ListModel<EmployeeModel>()
            {
                Items = lastUpdatedEmployees.Select(x => (EmployeeModel)x).ToList(),
                LastUpdated = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss")
            };
        }

        public string JSONDateConvert(string lastupdated)
        {
            if (string.IsNullOrEmpty(lastupdated))
                return "";
            return lastupdated.Substring(0, 10) + " " + lastupdated.Substring(11, 8);
        }
    }
}
