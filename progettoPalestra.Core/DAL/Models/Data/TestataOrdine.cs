using EQP.EFRepository.Core.Attributes;
using EQP.EFRepository.Core.Interface;
using progettoPalestra.Core.HelperService.LookupEntityService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Models.Data
{
    [Serializable]
    [LookupClass(typeof(TestataOrdineLookupService),new string[] {"ID", "Name", "Surname" })]
    public class TestataOrdine: IBaseEntity
    {
        public int ID { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal OrderTotal { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? PreferredDate { get; set; }
        public DateTime? PreferredTime { get; set; }
        public string Adress { get; set; }
        public int Cap { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string State { get; set; }
        public StatusEnum Status { get; set; }
        public List<RigaOrdine> RigheOrdine { get; set; } = new List<RigaOrdine>();
    }

    public enum StatusEnum
    {
        WAITING = 1,
        SHIPPED = 2,
        RECEIVED = 3
    }
}
