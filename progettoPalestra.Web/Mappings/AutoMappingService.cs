using AutoMapper;
using progettoPalestra.Core.DAL.Models.Generics;
using progettoPalestra.Core.DAL.Models.NotificationCenter;
using progettoPalestra.Core.HelperService;
using EQP.EFRepository.Core.Interface;
using EQP.EFRepository.Core.Models;
using progettoPalestra.Web.Mappings.ModelsDTO;
using progettoPalestra.Web.Mappings.ModelsDTO.Generics;
using progettoPalestra.Web.Mappings.ModelsDTO.NotificationCenter;
using progettoPalestra.Web.Mappings.Profiles.Generics;
using HSE.Core.HelperService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using progettoPalestra.Core.DAL.Models.Data;
using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;
using progettoPalestra.Web.Mappings.Profiles;

namespace progettoPalestra.Web.Mappings
{
    public class AutoMappingService
    {
        MapperConfiguration _mapperConfiguration;
        IMapper _mapper;
        private EQPLookupServiceLocator _lookupService;
        private EQPLookupServiceStringLocator _lookupStringService;

        public AutoMappingService(EQPLookupServiceLocator lookupService, EQPLookupServiceStringLocator lookupStringService)
        {
            _lookupService = lookupService;
            _lookupStringService = lookupStringService;

            //Crea il catalogo per la mappatura degli oggetti
            _mapperConfiguration = CreateMapperConfigurationCatalog();
            _mapper = _mapperConfiguration.CreateMapper();
        }

        public IMapper CurrentMapper
        {
            get { return _mapper; }
        }

        /// <summary>
        /// Definisce il catalogo per la mappatura dei diversi tipi di entità.
        /// </summary>
        /// <remarks>
        /// Se è necessario utilizzare uno specifico servizio del progetto CORE è sufficiente inserirlo tra i parametri del costruttore
        /// e poi utilizzarlo come necessario all'interno della classe corrente
        /// </remarks>
        /// <returns></returns>
        private MapperConfiguration CreateMapperConfigurationCatalog()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ComplexLinqPredicateDTO, ComplexLinqPredicate>();
                cfg.CreateMap<LinqPredicateDTO, LinqPredicate>();
                cfg.CreateMap<LinqFilterDTO, LinqFilter>().ConvertUsing((dto, m) =>
                {
                    LinqFilter filter = new LinqFilter()
                    {
                        ListElementPropertyName = dto.ListElementPropertyName,
                        PropertyName = dto.PropertyName,
                        RelationType = dto.RelationType
                    };

                    if (dto.PropertyValue != null && dto.PropertyValue.GetType() == typeof(Int64))
                        filter.PropertyValue = Convert.ChangeType(dto.PropertyValue, typeof(Int32));
                    else if (dto.PropertyValue != null && dto.PropertyValue.GetType() == typeof(Int64?))
                        filter.PropertyValue = Convert.ChangeType(dto.PropertyValue, typeof(Int32?));
                    else
                        filter.PropertyValue = dto.PropertyValue;

                    return filter;
                });
                cfg.CreateMap<LookupModel, LookupDTO>();
                cfg.CreateMap<IBaseEntity, LookupDTO>().ConvertUsing((model, dto) =>
                {
                    if (model == null)
                        return null;
                    string lookupLabel = _lookupService.GetLookupObjectLabel(model);
                    return new LookupDTO()
                    {
                        ID = model.ID,
                        Label = lookupLabel,
                        FullObject = _lookupService.NormalizeFullObject(model)
                    };
                });
                cfg.CreateMap<IBaseStringEntity, LookupDTO>().ConvertUsing((model, dto) =>
                {
                    if (model == null)
                        return null;
                    string lookupLabel = _lookupStringService.GetLookupObjectLabel(model);
                    return new LookupDTO()
                    {
                        ID = model.ID,
                        Label = lookupLabel,
                        FullObject = _lookupStringService.NormalizeFullObject(model)
                    };
                });

                //configurazione mapping Data.Model -> Data.DTO
                cfg.CreateMap<Category, CategoryDTO>().ReverseMap();
                cfg.CreateMap<Article, ArticleDTO>().ReverseMap();

                #region Mapping oggetti NotificationCenter
                cfg.CreateMap<Notification, NotificationDTO>();
                cfg.CreateMap<NotificationDetail, NotificationDetailDTO>()
                    .ForMember(d => d.IsRead, cfg => cfg.MapFrom((s, d, v, ctx) => s.ReadDate != null));
                #endregion

                #region Importazione profili di mapping

                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<TestataOrdineProfile>();
                cfg.AddProfile<RigaOrdineProfile>();

                #endregion
            });
        }
    }
}
