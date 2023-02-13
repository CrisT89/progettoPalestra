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
    public class ArticleController : ControllerBase
    {
        private ArticleService _articleService;
        private AutoMappingService _autoMappingService;

        public ArticleController(ArticleService articleService, AutoMappingService autoMappingService)
        {
            _articleService = articleService;
            _autoMappingService = autoMappingService;
        }

        [HttpGet, Route("/api/[controller]/GetAllArticles")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllArticles()
        {
            List<Article> articles = _articleService.GetAll().ToList();
            List<ArticleDTO> articlesDto = _autoMappingService.CurrentMapper.Map<List<ArticleDTO>>(articles);
            return Ok(articlesDto);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            Article article = _articleService.Get(id);
            ArticleDTO articleDto = _autoMappingService.CurrentMapper.Map<ArticleDTO>(article);
            return Ok(articleDto);
        }

        //API per articoli in evidenza

        [HttpGet, Route("/api/[controller]/GetInEvidence")]
        [AllowAnonymous]
        public async Task<IActionResult> GetInEvidence()
        {
            List<Article> articles = _articleService.GetBy(a=>a.InEvidence==true);
            List<ArticleDTO> articlesDto = _autoMappingService.CurrentMapper.Map<List<ArticleDTO>>(articles);
            return Ok(articlesDto);
        }

        //API articoli per categoria
        [HttpGet, Route("/api/[controller]/GetByCategory/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByCategory(int id)
        {
            List<Article> articles = _articleService.GetBy(a => a.FK_Category == id);
            List<ArticleDTO> articlesDto = _autoMappingService.CurrentMapper.Map<List<ArticleDTO>>(articles);
            return Ok(articlesDto);
        }

        [HttpPost, Route("/api/[controller]")]
        [AllowAnonymous]
        public async Task<IActionResult> SaveArticle([FromBody] ArticleDTO articleDto)
        {
            Article articleToSave = _autoMappingService.CurrentMapper.Map<Article>(articleDto);
            int articleSavedId = _articleService.Save(articleToSave);
            return Ok(articleSavedId);
        }

        [HttpPut, Route("/api/[controller]/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ModifyArticle(int id, [FromBody] ArticleDTO articleDto)
        {
            if (id != articleDto.ID)
            {
                return BadRequest();
            }
            Article articleToSave = _autoMappingService.CurrentMapper.Map<Article>(articleDto);
            int articleSavedId = _articleService.Save(articleToSave);
            return Ok(articleSavedId);
        }

        [HttpDelete, Route("/api/[controller]/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            _articleService.Delete(id);
            return Ok();
        }
    }
}
