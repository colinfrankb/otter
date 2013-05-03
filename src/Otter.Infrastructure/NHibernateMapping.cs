using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Otter.Infrastructure.Persistence;
using NHibernate;
using NHibernate.Burrow;
using NHibernate.Cfg;
using NHibernate.Event;

namespace Otter.Infrastructure
{
    public class NHibernateMapping : IConfigurator
    {
        public ISessionFactory SessionFactory;

        public virtual void Config(IBurrowConfig val)
        {
            val.ManualTransactionManagement = true;
            //val.PersistenceUnitCfgs.Add(new PersistenceUnitElement () {Name = "PersistenceUnit1", NHConfigFile = null} );
        }

        public virtual void Config(IPersistenceUnitCfg puCfg, Configuration nhCfg)
        {
            var config = Fluently.Configure(nhCfg)
                .Database(MsSqlConfiguration.MsSql2008.ConnectionString(c => c.FromAppSetting("connection_string")))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<EmployeeMap>())
                .ExposeConfiguration(x => x.SetProperty("current_session_context_class", "web"))
                .ExposeConfiguration(x => x.SetProperty("cache.provider_class", "NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache"))
                .ExposeConfiguration(x => x.SetProperty("cache.use_second_level_cache", "true"))
                .ExposeConfiguration(x => x.SetProperty("cache.use_query_cache", "true"))
                .ExposeConfiguration(x => x.SetProperty("connection.isolation", "ReadUncommitted"))
                .ExposeConfiguration(x => x.SetProperty("command_timeout", "60"))
                .ExposeConfiguration(x => x.SetProperty("show_sql", "false"))
                .ExposeConfiguration(x => x.SetProperty("generate_statistics", "false"))
                .BuildConfiguration();
            config.EventListeners.PreInsertEventListeners = new IPreInsertEventListener[] { new AuditTrailListener() };
            config.EventListeners.PreUpdateEventListeners = new IPreUpdateEventListener[] { new AuditTrailListener() };
            SessionFactory = config.BuildSessionFactory();
            SessionFactory.Statistics.IsStatisticsEnabled = false;
        }
    }
}