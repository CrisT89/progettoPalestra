using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.HelperService;
using progettoPalestra.Web.NotificationCenter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace progettoPalestra.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private FileService _fileService;
        private EmailService _emailService;
        public TestController(FileService fileService, EmailService emailService)
        {
            _fileService = fileService;
            _emailService = emailService;
        }

        // GET: api/<TestController>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            return Ok(new string[] { "value1", "value2" });
        }

        [HttpGet, Route("/api/[controller]/TestEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> TestEmail()
        {
            User newUser = new User()
            {
                Email = "ale.disalvatore@gmail.com",
                Name = "Alessandro",
                Surname = "Di Salvatore"
            };
            _emailService.ResetPasswordEmail(newUser, "123456");
            return Ok();
        }

        // GET api/<TestController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            return Ok("value 1");
        }

        // POST api/<TestController>
        [HttpPost]
        [AllowAnonymous]
        public void Post([FromBody] dynamic value)
        {
            //byte[] fileData = _fileService.GetFile("C:\\Users\\EQProject\\Desktop\\Backgounds\\4688479.png");
            //string base64String = Convert.ToBase64String(fileData);

            //Dictionary<string, object> result = new Dictionary<string, object>();
            //result.Add("FileDataBase64", base64String);
            //return Ok(result);
        }

    }
}
