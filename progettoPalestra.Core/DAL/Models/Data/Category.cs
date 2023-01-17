using EQP.EFRepository.Core.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Models.Data
{
    public class Category : IBaseEntity, IAuditEntity<int>
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Label { get; set; }
        public List<Article> Articles { get; set; } = new List<Article>();

        //Sezione Audit
        public int FK_InsertUser { get; set; }
        public DateTime InsertDate { get; set; }
        public int FK_UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
