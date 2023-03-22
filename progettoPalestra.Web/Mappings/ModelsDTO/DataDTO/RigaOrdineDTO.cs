using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Web.Mappings.ModelsDTO.Generics;

namespace progettoPalestra.Web.Mappings.ModelsDTO.DataDTO
{
    public class RigaOrdineDTO
    {
        public int ID { get; set; }
        //public string ArticleName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitaryPrice { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }


        public LookupDTO Article { get; set; }
        public int FK_Article { get; set; }
        public LookupDTO TestataOrdine { get; set; }
        public int FK_TestataOrdine { get; set; }
    }
}
