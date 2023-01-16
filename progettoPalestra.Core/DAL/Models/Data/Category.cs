using EQP.EFRepository.Core.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Models.Data
{
    public class Category : IBaseEntity
    {
        [Key]
        public int ID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Label { get; set; }
        public List<Article> Articles { get; set; } = new List<Article>();
    }
}
