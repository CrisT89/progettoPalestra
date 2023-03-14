using EQP.EFRepository.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Models.Data
{
    internal class RigaOrdine: IBaseEntity
    {
        public int ID { get; set; }
        public Article Article { get; set; }
        public int Quantity { get; set; }
        public decimal UnitaryPrice { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }


        public TestataOrdine TestataOrdine { get; set; }
        public int FK_TestataOrdine { get; set; }
    }
}
