using progettoPalestra.Core.DAL.Models.Data;
using System.ComponentModel.DataAnnotations;
using System;

namespace progettoPalestra.Web.Mappings.ModelsDTO.DataDTO
{
    public class ArticleDTO
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        [Range(0.00, 100.00)]
        public decimal? Iva { get; set; }
        public string ImagePath { get; set; }
        public byte[] ImageData { get; set; }
        public DateTime? EndOfValidity { get; set; }
        public CategoryDTO Category { get; set; }
        public bool? Suspended { get; set; }
        public bool? InEvidence { get; set; }
    }
}
