using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Otter.Domain.Contracts
{
    public interface IRepository<T>
    {
        T Get(long id);
        T Load(long id);
        IList<T> FindAll();
        long Save(T entity);
        void SaveOrUpdate(T entity);
        void Delete(T entity);
        void Update(T entity);
	}
}
