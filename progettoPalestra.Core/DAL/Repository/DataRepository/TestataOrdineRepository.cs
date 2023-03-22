using EQP.EFRepository.Core.Repository;
using Microsoft.EntityFrameworkCore;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Repository.DataRepository
{
    public class TestataOrdineRepository: IdentityRepository<TestataOrdine>
    {
        public TestataOrdineRepository(DatabaseContext databaseContext): base(databaseContext)
        {
            
        }

        public override void Save(TestataOrdine entity, bool checkConcurrency = true)
        {
            ManageOneToManyRelationEntityState(entity.RigheOrdine, p => p.FK_TestataOrdine == entity.ID);
            base.Save(entity, checkConcurrency);
        }

        public IQueryable<TestataOrdine> GetAllFull(params Expression<Func<TestataOrdine, object>>[] includes)
        {
            IQueryable<TestataOrdine> queryable = GetAll(includes);
            queryable = queryable.Include(o => o.RigheOrdine).ThenInclude(r => r.Article);
            return queryable;
        }

        public IQueryable<TestataOrdine> GetById(int ID, params Expression<Func<TestataOrdine, object>>[] includes)
        {
            IQueryable<TestataOrdine> queryable = GetBy(o => o.ID == ID, includes);
            queryable = queryable.Include(o => o.RigheOrdine).ThenInclude(r => r.Article);
            return queryable;
        }
    }
}
