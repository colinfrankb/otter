using System;

namespace Otter.Infrastructure.Contracts
{
    public interface ISpecification<T>
    {
        Func<T, bool> Criteria();
    }
}