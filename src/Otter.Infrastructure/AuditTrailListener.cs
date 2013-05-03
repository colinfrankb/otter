using System;
using Otter.Domain.Contracts;
using NHibernate.Event;

namespace Otter.Infrastructure
{
    public class AuditTrailListener : IPreUpdateEventListener, IPreInsertEventListener
    {
        public bool OnPreUpdate(PreUpdateEvent evt)
        {
            if (evt.Entity is IDateTrackable)
            {
                UpdateLastUpdated(evt.State, evt.Persister.PropertyNames, (IDateTrackable)evt.Entity);
            }
            return false;
        }

        public bool OnPreInsert(PreInsertEvent evt)
        {
            if (evt.Entity is IDateTrackable)
            {
                UpdateLastUpdated(evt.State, evt.Persister.PropertyNames, (IDateTrackable)evt.Entity);
                UpdateDateCreated(evt.State, evt.Persister.PropertyNames, (IDateTrackable)evt.Entity);
            }
            return false;
        }

        public void UpdateLastUpdated(object[] state, string[] names, IDateTrackable entity)
        {
            var index = Array.FindIndex(names, n => n == "LastUpdated");
            if (index >= 0 && index <= state.Length)
            {
                state[index] = DateTime.Now;
                entity.LastUpdated = DateTime.Now;
            }
        }

        public void UpdateDateCreated(object[] state, string[] names, IDateTrackable entity)
        {
            var index = Array.FindIndex(names, n => n == "DateCreated");
            if (index >= 0 && index <= state.Length)
            {
                entity.DateCreated = DateTime.Now;
                state[index] = DateTime.Now;
            }

        }
    }
}