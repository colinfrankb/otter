using FluentNHibernate.Mapping;
using Otter.Domain.Entities;

namespace Otter.Infrastructure.Persistence
{
    public class EmployeeMap : ClassMap<Employee>
    {
        public EmployeeMap()
        {
            Table("[Employee]");
            Id(x => x.Id).GeneratedBy.Identity().Column("id");
            Map(x => x.FirstName).Column("firstname");
            Map(x => x.Surname).Column("surname");
            Map(x => x.Email).Column("email");
            Map(x => x.Status).Column("status");
            Map(x => x.StartDate).Column("start_date").Nullable();
            Map(x => x.EndDate).Column("end_date").Nullable();
            Map(x => x.ETA).Column("eta").Nullable();
            Map(x => x.Reason).Column("reason");
            Map(x => x.ImageName).Column("image_name");
            Map(x => x.LastUpdated).Column("last_updated");
        }
    }
}
