using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Otter.Domain.Contracts;
using Otter.Infrastructure.Contracts;
using NHibernate;
using NHibernate.Linq;

namespace Otter.Infrastructure.Implementation
{
    public class Repository<T> : IRepository<T>
    {
        private readonly ISession _session;

        public Repository(ISession session)
        {
            _session = session;
        }

        public ISession Session
        {
            get
            {
                return _session;
            }
        }

        public T Get(long id)
        {
            return Session.Get<T>(id);
        }

        public T Load(long id)
        {
            return Session.Load<T>(id);
        }

        public IList<T> FindAll()
        {
            return Session.CreateCriteria(typeof(T)).List<T>();
        }

        public IList<T> FindAll(ICriteria criteria)
        {
            return criteria.List<T>();
        }

        public IList<TEntity> FindAll<TEntity>()
        {
            return Session.CreateCriteria(typeof(TEntity)).List<TEntity>();
        }

        public long Save(T entity)
        {
            return (long)Session.Save(entity);
        }

        public IList<T> FindBySpecification(ICriteriaSpecification<T> specification)
        {
            return specification.Criteria(_session).List<T>();
        }

        public void Update(T entity)
        {
            Session.Update(entity);
        }

        public void SaveOrUpdate(T item)
        {
            Session.SaveOrUpdate(item);
        }

        public void Delete(T item)
        {
            Session.Delete(item);
        }

        public IList<T> FindBySpecification(ISpecification<T> specification)
        {
            var context = Session.Query<T>();
            var all = context.Where(specification.Criteria());
            return all.ToList();
        }
    }
}
