using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace progettoPalestra.Core.Migrations.MSSQL
{
    public partial class TabelleOrdini2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestateOrdini",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderDate = table.Column<DateTime>(type: "date", nullable: false),
                    OrderTotal = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PreferredDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Adress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cap = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestateOrdini", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "RigheOrdini",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitaryPrice = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Iva = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false),
                    Total = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    FK_Article = table.Column<int>(type: "int", nullable: false),
                    FK_TestataOrdine = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RigheOrdini", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RigheOrdini_Articles_FK_Article",
                        column: x => x.FK_Article,
                        principalTable: "Articles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RigheOrdini_TestateOrdini_FK_TestataOrdine",
                        column: x => x.FK_TestataOrdine,
                        principalTable: "TestateOrdini",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RigheOrdini_FK_Article",
                table: "RigheOrdini",
                column: "FK_Article");

            migrationBuilder.CreateIndex(
                name: "IX_RigheOrdini_FK_TestataOrdine",
                table: "RigheOrdini",
                column: "FK_TestataOrdine");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RigheOrdini");

            migrationBuilder.DropTable(
                name: "TestateOrdini");
        }
    }
}
