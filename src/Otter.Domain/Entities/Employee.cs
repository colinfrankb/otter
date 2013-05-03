using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Otter.Domain.Contracts;

namespace Otter.Domain.Entities
{
    public class Employee : IEntity
    {
        public virtual long Id { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string Surname { get; set; }
        public virtual string Email { get; set; }
        public virtual string Status { get; set; }
        public virtual DateTime? StartDate { get; set; }
        public virtual DateTime? EndDate { get; set; }
        public virtual DateTime? ETA { get; set; }
        public virtual string Reason { get; set; }
        public virtual string ImageName { get; set; }
        public virtual DateTime LastUpdated { get; set; }
        public static bool operator ==(Employee a, Employee b) {
            return a.Id == b.Id;
        }
        public static bool operator !=(Employee a, Employee b)
        {
            return a.Id != b.Id;
        }
    }
}
