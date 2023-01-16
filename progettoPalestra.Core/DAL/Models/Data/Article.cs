using EQP.EFRepository.Core.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Models.Data
{
    public class Article : IBaseEntity
    {
        [Key]
        public int ID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int FK_Category { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
        public decimal Iva { get; set; }
        public string ImagePath { get; set; }
        [NotMapped]
        public byte[] ImageData { get; set; }
        public DateTime EndOfValidity { get; set; }
        public Category Category { get; set; }
        public bool Suspended { get; set; }
        public bool InEvidence { get; set; }
    }
}
