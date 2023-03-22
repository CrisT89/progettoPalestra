using AutoMapper;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using System.Collections.Generic;

namespace progettoPalestra.Web.Mappings.Profiles
{
    public class TestataOrdineProfile: Profile
    {
        public TestataOrdineProfile()
        {
            CreateMap<TestataOrdine, TestataOrdineDTO>().ReverseMap();
        }
    }
}
