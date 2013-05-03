using NHibernate;

namespace Otter.Infrastructure.Contracts
{
    public interface ICriteriaSpecification<T>
    {
        ICriteria Criteria(ISession session);
    }
}