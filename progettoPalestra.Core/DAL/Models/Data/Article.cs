using EQP.EFRepository.Core.Interface;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        public int ID { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        [Range(0.00,100.00)]
        public decimal? Iva { get; set; }
        public string ImagePath { get; set; }
        [NotMapped]
        public byte[] ImageData { get; set; }
        public DateTime? EndOfValidity { get; set; }
        public Category Category { get; set; }
        public bool? Suspended { get; set; }
        public bool? InEvidence { get; set; }
    }
}
