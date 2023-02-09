using EQP.EFRepository.Core.DAL;
using EQP.EFRepository.Core.Exceptions;
using EQP.EFRepository.Core.Interface;
using EQP.EFRepository.Core.Services;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.DAL.Repository;
using progettoPalestra.Core.DAL.Repository.Generics;
using progettoPalestra.Core.HelperService;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace progettoPalestra.Core.EntityService.Generics
{
    public class UserService : IdentityService<UserRepository, User>
    {

        private PasswordService _passwordService;
        private EmailService _emailService;

        public UserService(UnitOfWork<DatabaseContext> uow, PasswordService passwordService, EmailService emailService) : base(uow)
        {
            _passwordService = passwordService;
            _emailService = emailService;
        }

        /// <summary>
        /// Funzione che predispone l'utenza di admin all'interno della tabella Users.
        /// E' utilizzata quando viene creata una nuova istanza del DB
        /// </summary>
        public void CreateAdminUser()
        {
            //Utenza di admin con password = "admin"
            User adminUser = new User()
            {
                Name = "Admin",
                Surname = "Admin",
                Email = "admin@eqproject.it",
                Password = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
                ChangedPassword = true,
                SubscriptionDate = DateTime.Now
            };
            base.Save(adminUser);
        }


        #region Override metodi


        // *********************************************************************************************************
        // Cancellare questo metodo per avere i dati veri dal DB
        // *********************************************************************************************************
        //public override List<User> GetAll(params Expression<Func<User, object>>[] includes)
        //{
        //    List<User> dummy = new List<User>
        //        {
        //            new User { Name = "Fabio", Surname = "Faieta", Email = "fabio.faieta@eqproject.it", ID = 1, SubscriptionDate = DateTime.Now, ChangedPassword=true },
        //            new User { Name = "Andrea", Surname = "Cipollone", Email = "cipoci@eqproject.it", ID = 2, SubscriptionDate = DateTime.Now, ChangedPassword=false },
        //            new User { Name = "Mario", Surname = "Rossi", Email = "mario.rossi@eqproject.it", ID = 3, SubscriptionDate = DateTime.Now, ChangedPassword=true }
        //        };

        //    return dummy;
        //}





        protected override void SaveValidation(User entity)
        {
            if (Exists(x => x.Email == entity.Email && x.ID != entity.ID))
                throw new EntityValidationException("E' già presente un utente registrato nel sistema con questa email");
        }


        /// <summary>
        /// Durante il salvataggio, nella stessa transazione, mi assicuro che una volta salvato l'utente e ricavato L'ID
        /// abbia tutti i dati necessari per ricostruire la lista di oggetti UserCompanyRole da salvare nell'apposito servizio 
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="saveChanges"></param>
        /// <param name="IgnoreValidation"></param>
        /// <returns></returns>
        public override int Save(User entity, bool saveChanges = true, bool IgnoreValidation = false, bool checkConcurrency = true)
        {
            try
            {
                bool sendMail = ( entity.ID == 0 );
                string clearPassword = null;
                if (entity.ID == 0)
                {
                    entity.SubscriptionDate = DateTime.Now;

                    // creo una password casuale se non mi arriva nel Json
                    clearPassword = string.IsNullOrEmpty(entity.Password) ? _passwordService.MakePassword() : entity.Password;
                    // eseguo l'encrypt della password
                    entity.Password = _passwordService.EncryptSHA256(clearPassword);
                }

                int userSavedID = base.Save(entity, saveChanges);

                if (sendMail == true)
                    _emailService.CreateNewCredentialEmail(entity, clearPassword);

                return userSavedID;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Viene gestita la reimpostazione della password, qualora vengano passati anche i parametri "password" e "oldPassword" allora si sta parlando di modifica
        /// della password attuale quindi entrerà nel ramo dove verrà controllato se la password inserita corrisponde all'attuale e reimpostato il flag ChangedPassword a true
        /// altrimenti verrà gestita come reimpostazione della password casuale tramite invio mail
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <param name="oldPassword"></param>
        public void ResetPassword(User user, string password, string oldPassword)
        {

            string decryptedPassword;

            try
            {
                _uow.BeginTransaction();


                if (String.IsNullOrEmpty(password) && String.IsNullOrEmpty(oldPassword))
                {
                    decryptedPassword = _passwordService.MakePassword();
                    _emailService.ResetPasswordEmail(user, decryptedPassword);
                }
                else
                {
                    string tempEncryptedPassword = _passwordService.EncryptSHA256(oldPassword);

                    if (tempEncryptedPassword != user.Password)
                        throw new EntityValidationException("La vecchia password inserita non corrisponde a quella attuale, riprovare!");

                    user.ChangedPassword = true;
                    decryptedPassword = password;
                }

                user.Password = _passwordService.EncryptSHA256(decryptedPassword);
                _repository.Save(user);

                _uow.CommitTransaction();

            }
            catch (Exception ex)
            {
                _uow.RollbackTransaction();
                throw ex;
            }


        }

        #endregion
    }
}
