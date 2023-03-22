using EQP.EFRepository.Core.Interface;
using EQP.EFRepository.Core.Models;
using EQP.EFRepository.Core.Services;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.HelperService.LookupEntityService
{
    public class ArticleLookupService: LookupService
    {
        public ArticleLookupService(DatabaseContext context): base(context)
        {
            
        }
        public override List<IBaseEntity> GetEntitiesFromType(List<ComplexLinqPredicate> entityLinqPredicates)
        {
            return base.GetEntities<Article>(entityLinqPredicates);
        }
    }
}
