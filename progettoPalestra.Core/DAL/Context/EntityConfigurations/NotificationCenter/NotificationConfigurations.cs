using progettoPalestra.Core.DAL.Models.NotificationCenter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace progettoPalestra.Core.DAL.Context.EntityConfigurations.NotificationCenter
{
    class NotificationConfigurations : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.Property(e => e.Message).IsRequired();
            builder.Property(e => e.Title).IsRequired();
        }
    }
}
