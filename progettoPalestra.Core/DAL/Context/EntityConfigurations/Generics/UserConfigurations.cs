using progettoPalestra.Core.DAL.Models;
using progettoPalestra.Core.DAL.Models.Generics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.DAL.Context.EntityConfigurations.Generics
{
    public class UserConfigurations : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Name).IsRequired().HasMaxLength(80);
            builder.Property(u => u.Surname).IsRequired().HasMaxLength(80);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(50);
            builder.Property(u => u.Password).IsRequired().HasMaxLength(256);
            
            //Definisce l'indice univoco per il campo email dello User
            builder.HasIndex(u => u.Email).IsUnique();
           

        }
    }
}
