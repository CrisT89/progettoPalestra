using EQP.EFRepository.Core.DAL;
using EQP.EFRepository.Core.Services;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.DAL.Repository.DataRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.EntityService.DataService
{
    public class ArticleService : IdentityService<ArticleRepository, Article>
    {
        public ArticleService(UnitOfWork<DatabaseContext> uow) : base(uow)
        {

        }
    }
}
