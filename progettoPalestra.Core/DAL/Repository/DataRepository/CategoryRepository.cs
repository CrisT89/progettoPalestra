using EQP.EFRepository.Core.Repository;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Repository.DataRepository
{
    public class CategoryRepository:IdentityRepository<Category>
    {
        public CategoryRepository(DatabaseContext dbcontext) : base(dbcontext)
        {

        }
    }
}
