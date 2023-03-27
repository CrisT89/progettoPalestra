using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using EQP.EFRepository.Core.Exceptions;
using EQP.EFRepository.Core.Helpers;
using EQP.EFRepository.Core.Models;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.EntityService.Generics;
using progettoPalestra.Web.Mappings;
using progettoPalestra.Web.Mappings.ModelsDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace progettoPalestra.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;
        private AutoMappingService _autoMappingService;

        public UserController(UserService userService, AutoMappingService autoMappingService)
        {
            _userService = userService;
            _autoMappingService = autoMappingService;
        }


        [HttpGet, Route("/api/[controller]/GetAllUsers")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetAllUsers()
        {
            List<User> users = _userService.GetAll().ToList();
            List<UserDTO> userDto = _autoMappingService.CurrentMapper.Map<List<UserDTO>>(users);
            return Ok(userDto);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            User user = _userService.Get(id);

            UserDTO dtoUser = _autoMappingService.CurrentMapper.Map<UserDTO>(user);
            return Ok(dtoUser);
        }

        [HttpPost, Route("/api/[controller]")]
        //[AllowAnonymous]
        public async Task<IActionResult> SaveUser([FromBody] UserDTO userDto)
        {
            User userToSave = _autoMappingService.CurrentMapper.Map<User>(userDto);
            int userSavedID = _userService.Save(userToSave);
            return Ok(userSavedID);
        }

        [HttpDelete, Route("/api/[controller]/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            _userService.Delete(id);
            return Ok();
        }



        /// <summary>
        /// Metodo che genera nuovamente la password di un utente e invia l'email con le nuove credenziali
        /// </summary>
        /// <param name="password"></param>
        /// <remarks> Nell'oggetto data di tipo Dynamic l'oggetto avrà le proprietà ID, Password, OldPassword (le ultime due potrebbero essere null
        /// in caso di reimpostazione della password e non modifica)</remarks>
        /// <returns></returns>
        [HttpPost, Route("/api/[controller]/ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] dynamic data)
        {
            User currentUser = new User();
            int outValue;

            int? fk_user = int.TryParse(Convert.ToString(data.ID), out outValue) ? (int?)outValue : null;
            string currentPassword = data.Password?.ToString() ?? null;
            string oldPassword = data.OldPassword?.ToString() ?? null;
            string email = data.Email?.ToString() ?? null;


            if (fk_user != null)
            {
                currentUser = _userService.Get((int)fk_user);
            }
            else
            {
                currentUser = _userService.GetBy(x => x.Email == email).FirstOrDefault();
            }

            if (currentUser != null)
            {
                _userService.ResetPassword(currentUser, currentPassword, oldPassword);
                return Ok();
            }
            else
            {
                throw new EntityValidationException("Current email not exist in our system");
            }

        }



    }
}
