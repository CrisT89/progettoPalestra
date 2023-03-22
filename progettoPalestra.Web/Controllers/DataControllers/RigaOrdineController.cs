using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Core.EntityService.DataService;
using progettoPalestra.Web.Mappings;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace progettoPalestra.Web.Controllers.DataControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RigaOrdineController : ControllerBase
    {
        private RigaOrdineService _rigaOrdineService;
        private AutoMappingService _autoMappingService;
        public RigaOrdineController(RigaOrdineService rigaOrdineService, AutoMappingService autoMappingService)
        {
            _rigaOrdineService = rigaOrdineService;
            _autoMappingService = autoMappingService;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            RigaOrdine riga = _rigaOrdineService.Get(id, r => r.Article, r => r.TestataOrdine);
            RigaOrdineDTO rigaDto = _autoMappingService.CurrentMapper.Map<RigaOrdineDTO>(riga);
            return Ok(rigaDto);
        }
    }
}
