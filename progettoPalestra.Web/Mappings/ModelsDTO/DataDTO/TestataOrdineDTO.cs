using progettoPalestra.Core.DAL.Models.Data;
using System;
using System.Collections.Generic;

namespace progettoPalestra.Web.Mappings.ModelsDTO.DataDTO
{
    public class TestataOrdineDTO
    {
        public int ID { get; set; }
        public DateTime OrderDate { get; set; }

        public decimal OrderTotal { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? PreferredDate { get; set; }
        public string Adress { get; set; }
        public int Cap { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string State { get; set; }
        public StatusEnum Status { get; set; }
        public List<RigaOrdineDTO> RigheOrdine { get; set; }
    }
}
