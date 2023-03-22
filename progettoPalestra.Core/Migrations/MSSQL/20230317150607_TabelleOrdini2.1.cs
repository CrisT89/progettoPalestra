using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace progettoPalestra.Core.Migrations.MSSQL
{
    public partial class TabelleOrdini21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "PreferredDate",
                table: "TestateOrdini",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "PreferredDate",
                table: "TestateOrdini",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);
        }
    }
}
