using AutoMapper;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using System;
using System.Collections.Generic;

namespace progettoPalestra.Web.Mappings.Profiles
{
    public class TestataOrdineProfile: Profile
    {
        public TestataOrdineProfile()
        {
            CreateMap<TestataOrdineDTO, TestataOrdine>()
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(src => src.OrderDate.ToLocalTime()))
                .ForMember(dest => dest.PreferredDate, opt => opt.MapFrom(
                    src => src.PreferredDate != null ? src.PreferredDate.Value.ToLocalTime() : (DateTime?)null))
                .ReverseMap(); 
        }
    }
}
