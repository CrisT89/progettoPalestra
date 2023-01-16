using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.Attributes
{
    public class TranslationKeyAttribute : Attribute
    {
        public string TranslationKey { get; set; }
    }
}
