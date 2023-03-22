using EQP.EFRepository.Core.DAL;
using EQP.EFRepository.Core.Multilanguage.Interfaces;
using EQP.EFRepository.Core.Services;
using progettoPalestra.Core.DAL.Context;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.DAL.Repository.DataRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.EntityService.DataService
{
    public class TestataOrdineService: IdentityService<TestataOrdineRepository,TestataOrdine>
    {
        public TestataOrdineService(UnitOfWork<DatabaseContext> uow): base(uow)
        {
            
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
    }
}
