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
    public class TestataOrdineController : ControllerBase
    {
        private TestataOrdineService _testataOrdineService;
        private AutoMappingService _autoMappingService;
        public TestataOrdineController(TestataOrdineService testataOrdineService, AutoMappingService autoMappingService)
        {
            _testataOrdineService = testataOrdineService;
            _autoMappingService = autoMappingService;
        }

        [HttpGet, Route("/api/[controller]/GetAllOrders")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllOrders()
        {
            List<TestataOrdine> ordini = _testataOrdineService.GetAllFull().ToList();
            List<TestataOrdineDTO> ordiniDto = _autoMappingService.CurrentMapper.Map<List<TestataOrdineDTO>>(ordini);
            return Ok(ordiniDto);
        }

        [HttpGet, Route("/api/[controller]/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            TestataOrdine ordine = _testataOrdineService.GetById(id);
            TestataOrdineDTO ordineDto = _autoMappingService.CurrentMapper.Map<TestataOrdineDTO>(ordine);
            return Ok(ordineDto);
        }

        [HttpPost, Route("/api/[controller]")]
        [AllowAnonymous]
        public async Task<IActionResult> SaveOrder([FromBody] TestataOrdineDTO orderDto)
        {
            TestataOrdine orderToSave = _autoMappingService.CurrentMapper.Map<TestataOrdine>(orderDto);
            int orderSavedId = _testataOrdineService.Save(orderToSave);
            return Ok(orderSavedId);
        }
    }
}
