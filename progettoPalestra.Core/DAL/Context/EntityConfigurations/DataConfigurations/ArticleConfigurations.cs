using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using progettoPalestra.Core.DAL.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace progettoPalestra.Core.DAL.Context.EntityConfigurations.DataConfigurations
{
    public class ArticleConfigurations : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.Property(a => a.Code)
                .IsRequired();

            builder.Property(a => a.Name)
                .IsRequired();

            builder.Property(a => a.Description)
                .IsRequired();

            builder.Property(a => a.Price)
                .HasPrecision(10,2)
                .IsRequired();

            builder.Property(a => a.DiscountPrice)
                .HasPrecision(10, 2);

            builder.Property(a=>a.Iva)
                .HasPrecision(5, 2);

            //Code unico
            builder.HasIndex(a => a.Code)
                .IsUnique();
        }
    }
}
