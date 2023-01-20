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
    public class CategoryConfigurations : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            //Name unico
            builder.HasIndex(c => c.Name)
                .IsUnique();

            builder.Property(c => c.Label)
                .HasMaxLength(40);

            //relazione 1 a N
            builder.HasMany<Article>(c => c.Articles)
                .WithOne(a => a.Category)
                .HasForeignKey(a => a.FK_Category);
        }
    }
}
