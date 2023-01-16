using AutoMapper;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Web.Mappings.ModelsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace progettoPalestra.Web.Mappings.Profiles.Generics
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
