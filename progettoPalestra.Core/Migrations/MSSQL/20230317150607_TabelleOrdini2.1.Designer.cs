﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using progettoPalestra.Core.DAL.Context;

#nullable disable

namespace progettoPalestra.Core.Migrations.MSSQL
{
    [DbContext(typeof(MSSQL_DbContext))]
    [Migration("20230317150607_TabelleOrdini2.1")]
    partial class TabelleOrdini21
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.Article", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("DiscountPrice")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<DateTime?>("EndOfValidity")
                        .HasColumnType("datetime2");

                    b.Property<int>("FK_Category")
                        .HasColumnType("int");

                    b.Property<int>("FK_InsertUser")
                        .HasColumnType("int");

                    b.Property<int>("FK_UpdateUser")
                        .HasColumnType("int");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("InEvidence")
                        .HasColumnType("bit");

                    b.Property<DateTime>("InsertDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal?>("Iva")
                        .HasPrecision(5, 2)
                        .HasColumnType("decimal(5,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<bool?>("Suspended")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("Code")
                        .IsUnique();

                    b.HasIndex("FK_Category");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.Category", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FK_InsertUser")
                        .HasColumnType("int");

                    b.Property<int>("FK_UpdateUser")
                        .HasColumnType("int");

                    b.Property<DateTime>("InsertDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Label")
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.RigaOrdine", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int>("FK_Article")
                        .HasColumnType("int");

                    b.Property<int>("FK_TestataOrdine")
                        .HasColumnType("int");

                    b.Property<decimal>("Iva")
                        .HasPrecision(5, 2)
                        .HasColumnType("decimal(5,2)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<decimal>("UnitaryPrice")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.HasKey("ID");

                    b.HasIndex("FK_Article");

                    b.HasIndex("FK_TestataOrdine");

                    b.ToTable("RigheOrdini");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.TestataOrdine", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Cap")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("date");

                    b.Property<decimal>("OrderTotal")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PreferredDate")
                        .HasColumnType("date");

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("TestateOrdini");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Generics.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<bool>("ChangedPassword")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<DateTime>("SubscriptionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.HasKey("ID");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.NotificationCenter.Notification", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<string>("AdditionalParams")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.NotificationCenter.NotificationDetail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"), 1L, 1);

                    b.Property<int>("FK_Notification")
                        .HasColumnType("int");

                    b.Property<int?>("FK_Receiver")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ReadDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ReceiverEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SendDate")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("FK_Notification");

                    b.HasIndex("FK_Receiver");

                    b.ToTable("NotificationDetails");

                    b.HasCheckConstraint("CK_RECEIVER", "(FK_Receiver IS NOT NULL) OR (FK_Receiver IS NULL AND ReceiverEmail IS NOT NULL)");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.Article", b =>
                {
                    b.HasOne("progettoPalestra.Core.DAL.Models.Data.Category", "Category")
                        .WithMany("Articles")
                        .HasForeignKey("FK_Category")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.RigaOrdine", b =>
                {
                    b.HasOne("progettoPalestra.Core.DAL.Models.Data.Article", "Article")
                        .WithMany("RigheOrdine")
                        .HasForeignKey("FK_Article")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("progettoPalestra.Core.DAL.Models.Data.TestataOrdine", "TestataOrdine")
                        .WithMany("RigheOrdine")
                        .HasForeignKey("FK_TestataOrdine")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("TestataOrdine");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.NotificationCenter.NotificationDetail", b =>
                {
                    b.HasOne("progettoPalestra.Core.DAL.Models.NotificationCenter.Notification", "Notification")
                        .WithMany("NotificationDetails")
                        .HasForeignKey("FK_Notification")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("progettoPalestra.Core.DAL.Models.Generics.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("FK_Receiver")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Notification");

                    b.Navigation("Receiver");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.Article", b =>
                {
                    b.Navigation("RigheOrdine");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.Category", b =>
                {
                    b.Navigation("Articles");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.Data.TestataOrdine", b =>
                {
                    b.Navigation("RigheOrdine");
                });

            modelBuilder.Entity("progettoPalestra.Core.DAL.Models.NotificationCenter.Notification", b =>
                {
                    b.Navigation("NotificationDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
