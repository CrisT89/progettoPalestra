using AutoMapper;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;

namespace progettoPalestra.Web.Mappings.Profiles
{
    public class RigaOrdineProfile: Profile
    {
        public RigaOrdineProfile()
        {
            CreateMap<RigaOrdine, RigaOrdineDTO>().ReverseMap();
        }
    }
}
