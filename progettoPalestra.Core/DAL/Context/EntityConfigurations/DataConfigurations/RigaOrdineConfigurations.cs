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
    public class RigaOrdineConfigurations: IEntityTypeConfiguration<RigaOrdine>
    {
        public void Configure(EntityTypeBuilder<RigaOrdine> builder)
        {
            //builder.Property(r => r.ArticleName).IsRequired();
            builder.Property(r => r.Quantity).IsRequired();
            builder.Property(r => r.UnitaryPrice)
                .IsRequired()
                .HasPrecision(10,2);
            builder.Property(r => r.Iva)
                .IsRequired()
                .HasPrecision(5, 2);
            builder.Property(r => r.Total)
                .IsRequired()
                .HasPrecision(10, 2);

            builder.HasOne(r => r.Article)
                .WithMany(a => a.RigheOrdine)
                .HasForeignKey(r => r.FK_Article);
        }
    }
}
