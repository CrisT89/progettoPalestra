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
    public class TestataOrdineConfigurations: IEntityTypeConfiguration<TestataOrdine>
    {
        public void Configure(EntityTypeBuilder<TestataOrdine> builder)
        {
            builder.Property(t => t.OrderDate)
                .IsRequired()
                .HasColumnType("date");
            builder.Property(t => t.OrderTotal)
                .IsRequired()
                .HasPrecision(10,2);
            builder.Property(t => t.Name).IsRequired();
            builder.Property(t => t.Surname).IsRequired();
            builder.Property(t => t.PhoneNumber).IsRequired();
            builder.Property(t => t.Email).IsRequired();
            builder.Property(t => t.Adress).IsRequired();
            builder.Property(t => t.Cap).IsRequired();
            builder.Property(t => t.City).IsRequired();
            builder.Property(t => t.Province).IsRequired();
            builder.Property(t => t.State).IsRequired();
            builder.Property(t => t.Status).IsRequired();
            builder.Property(t => t.PreferredDate).HasColumnType("date");

            builder.HasMany<RigaOrdine>(testata => testata.RigheOrdine)
                   .WithOne(riga => riga.TestataOrdine)
                   .HasForeignKey(riga => riga.FK_TestataOrdine);
        }
    }
}
