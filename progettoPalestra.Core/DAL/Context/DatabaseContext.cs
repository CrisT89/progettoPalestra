using progettoPalestra.Core.DAL.Context.EntityConfigurations.Generics;
using progettoPalestra.Core.DAL.Context.EntityConfigurations.NotificationCenter;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.DAL.Models.NotificationCenter;
using progettoPalestra.Core.HelperService;
using EQP.EFRepository.Core.Interface;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.DAL.Context.EntityConfigurations.DataConfigurations;

namespace progettoPalestra.Core.DAL.Context
{
    public class DatabaseContext : DbContext, ISessionModel
    {
        private string _connectionString;
        private DbProvider _provider;
        public IBaseEntity User { get; set; }
        public IBaseStringEntity UserString { get; set; }
        public IBaseEntity Language { get; set; }
        public DatabaseContext(DbProvider provider)
        {
            object runtimeConnectionConfig = System.AppContext.GetData("ConnectionConfig");

            if (runtimeConnectionConfig != null)
            {
                dynamic obj = JsonConvert.DeserializeObject(runtimeConnectionConfig.ToString());
                _provider = provider;
                switch (provider)
                {
                    case DbProvider.MySql:
                        _connectionString = obj.MySQL;
                        break;

                    case DbProvider.SQLServer:
                        _connectionString = obj.MSSQL;
                        break;
                }

            }
        }

        public DatabaseContext(string connectionString, DbProvider dbProvider)
        {
            _connectionString = connectionString;
            _provider = dbProvider;
        }

        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DatabaseContext(DbContextOptions options, string ConnectionString, DbProvider Provider) : base(options)
        {
            _connectionString = ConnectionString;
            _provider = Provider;
        }


        #region DBSET
        // <ewz:dbset>
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<TestataOrdine> TestateOrdini { get; set; }
        public DbSet<RigaOrdine> RigheOrdini { get; set; }
        public DbSet<vArticle> vArticles { get; set; }

        #region NotificationCenter
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationDetail> NotificationDetails { get; set; }
        #endregion

        #endregion





        /// <summary>
        /// Sincronizza il database lanciando tutte le migrations pendenti
        /// </summary>
        public void SyncDbContextMigrations()
        {
            this.Database.Migrate();
        }






        /// <summary>
        /// Invocato al primo accesso al DB o all'avvio di una migration.
        /// Configura il provider e la connessione al DB.
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (string.IsNullOrEmpty(_connectionString))
                throw new ApplicationException("The connection string has not been defined.");

            if (_provider == 0)
                throw new ApplicationException("The provider for the database context has not been defined");

            switch (_provider)
            {
                case DbProvider.SQLServer:
                    optionsBuilder.UseSqlServer(_connectionString);
                    break;

                case DbProvider.MySql:
                    ServerVersion mysqlServerVersion = ServerVersion.AutoDetect(_connectionString);
                    optionsBuilder.UseMySql(_connectionString, mysqlServerVersion);
                    break;
            }
        }

        /// <summary>
        /// Definisce i file di configurazione (che utilizzano FluentAPI) dei modelli definiti nel contesto.
        /// Nei file di configurazione sono definiti i vincoli e le relazioni.
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new UserConfigurations());
            modelBuilder.ApplyConfiguration(new CategoryConfigurations());
            modelBuilder.ApplyConfiguration(new ArticleConfigurations());
            modelBuilder.ApplyConfiguration(new TestataOrdineConfigurations());
            modelBuilder.ApplyConfiguration(new RigaOrdineConfigurations());
            modelBuilder.Entity<vArticle>().ToView("vArticles").HasNoKey();
            #region FluentAPI per entità NotificationCenter
            modelBuilder.ApplyConfiguration(new NotificationConfigurations());
            modelBuilder.ApplyConfiguration(new NotificationDetailConfigurations());
            #endregion

        }


    }
}
