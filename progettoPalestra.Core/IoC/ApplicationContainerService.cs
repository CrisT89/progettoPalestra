using Autofac;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.EntityService.Generics;
using progettoPalestra.Core.EntityService.NotificationCenter;
using progettoPalestra.Core.HelperService;
using progettoPalestra.Core.HelperService.NotificationCenter;
using EQP.EFRepository.Core.DAL;
using EQP.EFRepository.Core.Services;
using HSE.Core.HelperService;
using System;
using System.Collections.Generic;
using System.Text;
using progettoPalestra.Core.EntityService.DataService;

namespace progettoPalestra.Core.IoC
{
    public class ApplicationContainerService : Module
    {
        private readonly string _connectionString;
        private readonly DbProvider _dbProvider;
        public ApplicationContainerService(string connectionString, DbProvider dbContextProvider)
        {
            _connectionString = connectionString;
            _dbProvider = dbContextProvider;
        }

        protected override void Load(ContainerBuilder builder)
        {
            //Se non è stata passata la stringa di connessione allora solleva un'eccezione e interrompe l'inizializzazione del catalogo
            if (string.IsNullOrEmpty(_connectionString))
                throw new ApplicationException("The connection string has not been defined.");

            if (_dbProvider == 0)
                throw new ApplicationException("The provider for the database context has not been defined");

            //Configura il tipo del DatabaseContext in modo che restituisca sempre la stessa istanza
            builder.Register<DatabaseContext>((c) =>
            {
                return new DatabaseContext(_connectionString, _dbProvider);
            }).InstancePerLifetimeScope();

            //Configurazione UnitOfWork
            builder.RegisterType<UnitOfWork<DatabaseContext>>().InstancePerLifetimeScope().AsSelf();

            #region Configurazione Servizi di helper

            //Configurazione del servizio in cui vengono memorizzate le impostazioni di configurazione dell'ambiente
            builder.RegisterType<ConfigurationService>().SingleInstance();

            //Configurazione del servizio per la gestione dei token tramite JWT
            builder.RegisterType<JwtService>().SingleInstance();

            //Configurazione del servizio per la gestione delle migration sui diversi provider DB
            builder.RegisterType<DatabaseService>().SingleInstance();

            //Configurazione servizio per la gestione delle sessioni http
            builder.RegisterType<SessionService>().InstancePerLifetimeScope().AsSelf();

            //Configurazione servizio per la gestione dell'autenticazione
            builder.RegisterType<AuthService>().AsSelf();

            //Configurazione servizio per la gestione delle password (singleton)
            builder.RegisterType<PasswordService>().SingleInstance();

            //Configurazione servizio per la gestione delle Email
            builder.RegisterType<EmailService>().SingleInstance();

            //Configurazione servizio per le entità di lookup
            builder.RegisterType<EQPLookupServiceLocator>().AsSelf();
            builder.RegisterType<EQPLookupServiceStringLocator>().AsSelf();

            builder.RegisterType<EQPDbContextService>().AsSelf();

            //Configurazione servizio per la gestione del servizio multilingua
            builder.RegisterType<EQPMultiLanguageService>().AsSelf();

            builder.RegisterType<EQPDictionaryManagerService>().AsSelf();

            builder.RegisterType<EQPResolverService>().AsSelf();

            //Configurazione servizio per la gestione dei file
            builder.RegisterType<FileService>().AsSelf();

            //Configurazione servizio per gestione import/export CSV
            builder.RegisterType<EQPImportExportService>().AsSelf();

            #endregion

            #region Configurazione Servizi per le entità
            // <ewz:servicesRegistering>
            builder.RegisterType<UserService>().AsSelf();
            builder.RegisterType<CategoryService>().AsSelf();
            builder.RegisterType<ArticleService>().AsSelf();
            builder.RegisterType<TestataOrdineService>().AsSelf();
            builder.RegisterType<RigaOrdineService>().AsSelf();

            #region Servizi per entità NotificationCenter
            builder.RegisterType<NotificationService>().AsSelf();
            builder.RegisterType<NotificationDetailService>().AsSelf();
            builder.RegisterType<NotificationHubService>().InstancePerLifetimeScope().OnRelease(instance => instance.CloseConnection());
            #endregion
            #endregion

        }
    }
}
