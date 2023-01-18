using progettoPalestra.Core.DAL.Models.Data;
using System.Collections.Generic;

namespace progettoPalestra.Web.Mappings.ModelsDTO.DataDTO
{
    public class CategoryDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Label { get; set; }
        public List<ArticleDTO> Articles { get; set; }
    }
}
