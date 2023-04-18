namespace progettoPalestra.Web.Mappings.ModelsDTO.DataDTO
{
    public class ArticleStatisticDTO
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public int TotaleAcquistati { get; set; }
        public decimal TotaleImporto { get; set; }
        public string PrimoOrdine { get; set; }
        public int GiorniDaUltimoOrdine { get; set; }
    }
}
