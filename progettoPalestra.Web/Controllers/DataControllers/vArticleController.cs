using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.EntityService.DataService;
using progettoPalestra.Core.HelperService;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using progettoPalestra.Web.Mappings;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace progettoPalestra.Web.Controllers.DataControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class vArticleController : ControllerBase
    {
        private EQPDbContextService _dbContextService;

        public vArticleController(EQPDbContextService dbContextService)
        {
            _dbContextService = dbContextService;
        }

        [HttpGet, Route("/api/[controller]/GetFromView")]
        public async Task<IActionResult> GetFromView([FromQuery] int? FK_Cat = null, [FromQuery] string? fromDate = null, [FromQuery] string? untilDate = null)
        {
            List<vArticle> articles;
            if (FK_Cat == null)
            {
                 articles = _dbContextService.GetDataFromView<vArticle>();
            }
            else
            {
                 articles = _dbContextService.GetDataFromView<vArticle>(art => art.FK_Category == FK_Cat);
            }
            if (fromDate != null)
            {
                DateTime date = DateTime.Parse(fromDate);
                articles = articles.Where(art => art.OrderDate >= date).ToList();
            }
            if (untilDate != null)
            {
                DateTime date = DateTime.Parse(untilDate);
                articles = articles.Where(art => art.OrderDate <= date).ToList();
            }

            DateTime today = DateTime.Today;
            int numeroDiDati = 10;

            var query = from article in articles
                        group article by new { article.ID, article.Name }
                        into a
                        orderby a.Sum(x => x.Quantity) descending
                        select new ArticleStatisticDTO { 
                                     ID = a.Key.ID,
                                     Nome = a.Key.Name,
                                     TotaleAcquistati = a.Sum(x => x.Quantity), 
                                     TotaleImporto = a.Sum(x => x.Quantity * x.UnitaryPrice),
                                     PrimoOrdine = a.Min(x => x.OrderDate).Value.ToString("d"),
                                     GiorniDaUltimoOrdine = (today - a.Max(x => x.OrderDate)).Value.Days
                        };

            List<ArticleStatisticDTO> statisticData = query.Take(numeroDiDati).ToList();
            return Ok(statisticData);
        }
    }
}
