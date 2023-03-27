using EQP.EFRepository.Core.DAL;
using EQP.EFRepository.Core.Multilanguage.Interfaces;
using EQP.EFRepository.Core.Services;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.DAL.Repository.DataRepository;
using progettoPalestra.Core.EntityService.Generics;
using progettoPalestra.Core.HelperService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.EntityService.DataService
{
    public class TestataOrdineService: IdentityService<TestataOrdineRepository,TestataOrdine>
    {
        private ConfigurationService _configurationService;
        private UserService _userService;
        private EmailService _emailService;
        public TestataOrdineService(UnitOfWork<DatabaseContext> uow, ConfigurationService configurationService, UserService userService, EmailService emailService) : base(uow)
        {

            _configurationService = configurationService;
            _userService = userService;
            _emailService = emailService;
        }

        //
        // Summary:
        //     Restituisce l'elenco di tutte le entità di tipo TestataOrdine presenti sul DB compresa
        //     la list di RigheOrdine e i relativi Article, escludendo
        //     quelle cancellate logicamete (se TEntity implementa ISoftDelete). Se il parametro
        //     includes viene passato allora vengono popolate anche le relazioni indicate.
        //
        // Parameters:
        //   includes:
        //     Eventuali proprietà per cui applicare l'eagerLoading (inclusione delle relazioni)
        //
        // Returns:
        //     Restituisce un lista di oggetti TestataOrdine
        public virtual List<TestataOrdine> GetAllFull(params Expression<Func<TestataOrdine, object>>[] includes)
        {
            List<TestataOrdine> list = _repository.GetAllFull(includes).ToList();
            return list;
        }

        public TestataOrdine GetById(int id, params Expression<Func<TestataOrdine, object>>[] includes)
        {
            TestataOrdine ordine = _repository.GetById(id).FirstOrDefault();
            return ordine;
        }

        public int SaveAndSendAdminMail(TestataOrdine ordine)
        {
            int idOrdine = Save(ordine);

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(_configurationService.EmailFrom);

            List<User> admins = _userService.GetAll().ToList();
            foreach (User user in admins)
            {
                mail.To.Add(user.Email);
            }

            mail.Subject = "Ordine ID: " + idOrdine;
            mail.Body = "Nuovo ordine salvato!";

            _emailService.SendEmail(mail, true);

            return idOrdine;
        }

      
    }
}
