using progettoPalestra.Core.HelperService.LookupEntityService;
using EQP.EFRepository.Core.Attributes;
using EQP.EFRepository.Core.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.DAL.Models.Generics
{
    [Serializable]
    [LookupClass(typeof(UserLookupService), new string[] { "Name", "Surname" }, IncludeFullObject = false)]
    public class User : IBaseEntity
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public bool ChangedPassword { get; set; }

        public DateTime SubscriptionDate { get; set; }

    }

}
