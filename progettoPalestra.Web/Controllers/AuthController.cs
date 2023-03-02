using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using progettoPalestra.Core.DAL.Models.Anagrafica;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.EntityService.Generics;
using progettoPalestra.Core.HelperService;
using progettoPalestra.Web.Mappings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using progettoPalestra.Web.Mappings.ModelsDTO;

namespace progettoPalestra.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthService _authService;
        private AutoMappingService _mappingService;
        private JwtService _jwtService;
        private UserService _userService;

        public AuthController(AuthService authService, AutoMappingService mappingService, JwtService jwtService, UserService userService)
        {
            _authService = authService;
            _mappingService = mappingService;
            _jwtService = jwtService;
            _userService = userService;
            
        }

        [HttpPost, Route("/api/[controller]/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] dynamic loginData)
        {
            User loginUser = _authService.Login(loginData.Email.ToString(), loginData.Password.ToString());

            Dictionary<string, object> payload = new Dictionary<string, object>();
            payload.Add(AuthService.PAYLOAD_USER_KEY, _mappingService.CurrentMapper.Map<User>(loginUser));

            string token = _jwtService.PayloadToToken(payload);

            return new JsonResult(token);
        }

        [HttpPost, Route("/api/[controller]/register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            
            User userToSave = _mappingService.CurrentMapper.Map<User>(userDto);
            int userSavedID = _userService.Save(userToSave);
            return Ok(userSavedID);
        }
    }
}
