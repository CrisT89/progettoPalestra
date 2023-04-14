using EQP.EFRepository.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Models.Data
{
    public class vArticle: IViewEntity
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int FK_Category { get; set; }
        public int Quantity { get; set; }
        public decimal UnitaryPrice { get; set; }
        public int FK_TestataOrdine { get; set; }
        public DateTime? OrderDate { get; set; }
    }
}
