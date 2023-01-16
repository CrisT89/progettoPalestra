using EQP.EFRepository.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace progettoPalestra.Web.Mappings.ModelsDTO
{
    public class LookupConfigDTO
    {
        public string TypeName { get; set; }
        public LookupCustomConfig CustomConfig { get; set; }
        public List<LinqPredicateDTO> Filters { get; set; }
        public List<ComplexLinqPredicateDTO> ComplexFilters { get; set; }
    }
}
