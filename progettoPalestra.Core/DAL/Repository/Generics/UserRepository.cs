using EQP.EFRepository.Core.Repository;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models;
using progettoPalestra.Core.DAL.Models.Generics;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.DAL.Repository.Generics
{
    public class UserRepository : IdentityRepository<User>
    {
        public UserRepository(DatabaseContext context) : base(context) { }
    }
}
