using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.EntityService.DataService;
using progettoPalestra.Web.Mappings;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace progettoPalestra.Web.Controllers.DataControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private CategoryService _categoryService;
        private AutoMappingService _autoMappingService;

        public CategoryController(CategoryService categoryService, AutoMappingService autoMappingService)
        {
            _categoryService = categoryService;
            _autoMappingService = autoMappingService;
        }

        [HttpGet, Route("/api/[controller]/GetAllCategories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCategories()
        {
            List<Category> categories = _categoryService.GetAll().ToList();
            List<CategoryDTO> categoriesDto = _autoMappingService.CurrentMapper.Map<List<CategoryDTO>>(categories);
            return Ok(categoriesDto);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            Category category = _categoryService.Get(id);
            CategoryDTO categoryDto = _autoMappingService.CurrentMapper.Map<CategoryDTO>(category);
            return Ok(categoryDto);
        }

        [HttpPost, Route("/api/[controller]")]
        [AllowAnonymous]
        public async Task<IActionResult> SaveCategory([FromBody] CategoryDTO categoryDto)
        {
            Category categoryToSave = _autoMappingService.CurrentMapper.Map<Category>(categoryDto);
            int categorySavedId = _categoryService.Save(categoryToSave);
            return Ok(categorySavedId);
        }

        [HttpDelete, Route("/api/[controller]/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            _categoryService.Delete(id);
            return Ok();
        }
    }
}
