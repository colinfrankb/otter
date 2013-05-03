using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Otter.Domain.Entities;

namespace Otter.API.Models
{
    public class EmployeeModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string ETA { get; set; }
        public string Reason { get; set; }
        public string ImageName { get; set; }
        public static explicit operator EmployeeModel(Employee employee)
        {
            return new EmployeeModel(employee);
        }
        public EmployeeModel()
        {
           
        }

        public EmployeeModel(Employee employee)
        {
            Id = employee.Id;
            FirstName = employee.FirstName;
            LastName = employee.Surname;
            Status = employee.Status;
            if (isStartDateApproaching(employee.StartDate))
                StartDate = string.Format("{0:dddd d}{1}", employee.StartDate.Value, SuffixForDay(employee.StartDate.Value));
            if(employee.EndDate.HasValue)
                EndDate = string.Format("{0:dddd d}{1}", employee.EndDate.Value, SuffixForDay(employee.EndDate.Value));
            if (employee.ETA.HasValue)
                ETA = employee.ETA.Value.ToString(@"HH\:mm");
            Reason = employee.Reason;
            ImageName = employee.ImageName;
        }

        private bool isStartDateApproaching(DateTime? startDate)
        {
            return startDate.HasValue && (startDate.Value > DateTime.Now) ? true : false;
        }

        private string SuffixForDay(DateTime date)
        {
            switch (date.Day)
            {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        }
    }
}