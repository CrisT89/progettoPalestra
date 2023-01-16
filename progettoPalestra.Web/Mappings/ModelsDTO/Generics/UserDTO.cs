using progettoPalestra.Core.DAL.Models.Generics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace progettoPalestra.Web.Mappings.ModelsDTO
{
    public class UserDTO 
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
