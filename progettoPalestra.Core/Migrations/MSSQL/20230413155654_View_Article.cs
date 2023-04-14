using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace progettoPalestra.Core.Migrations.MSSQL
{
    public partial class View_Article : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE VIEW vArticles AS
                                   SELECT a.ID, a.Name, 
		                                    SUM(ro.Quantity) AS NumeroAcquisti, 
		                                    SUM(ro.Total) AS TotaleImporto,
		                                    MIN(tor.OrderDate) AS PrimoOrdine, 
		                                    MAX(tor.OrderDate) AS UltimoOrdine
                                    FROM dbo.Articles AS a
                                    JOIN dbo.RigheOrdini AS ro
	                                    ON a.ID = ro.FK_Article
                                    JOIN dbo.TestateOrdini AS tor
	                                    ON ro.FK_TestataOrdine = tor.ID
                                    GROUP BY a.ID, a.Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP VIEW vArticles;");
        }
    }
}
