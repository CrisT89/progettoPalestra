using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace progettoPalestra.Core.Migrations.MSSQL
{
    public partial class Colonna_Time : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PreferredTime",
                table: "TestateOrdini",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreferredTime",
                table: "TestateOrdini");
        }
    }
}
