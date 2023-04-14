using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace progettoPalestra.Core.Migrations.MSSQL
{
    public partial class Modified_vArticles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"ALTER VIEW vArticles AS
                                   select a.ID, a.Code, a.Name, a.FK_Category,
		                                    ro.Quantity, ro.UnitaryPrice, ro.FK_TestataOrdine,
		                                    tor.OrderDate
                                    from Articles as a
                                    join RigheOrdini as ro on (a.ID = ro.FK_Article)
                                    join TestateOrdini as tor on (tor.ID = ro.FK_TestataOrdine)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"ALTER VIEW vArticles AS
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
    }
}
