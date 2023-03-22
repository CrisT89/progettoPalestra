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
    public class RigaOrdineRepository: IdentityRepository<RigaOrdine>
    {
        public RigaOrdineRepository(DatabaseContext databaseContext): base(databaseContext)
        {
            
        }
    }
}
