using progettoPalestra.Core.DAL.Context;
using EQP.EFRepository.Core.Multilanguage.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.HelperService
{
    public class EQPMultiLanguageService : MultiLanguageService
    {
        public EQPMultiLanguageService(DatabaseContext ctx) : base(ctx)
        {
        }
    }
}
