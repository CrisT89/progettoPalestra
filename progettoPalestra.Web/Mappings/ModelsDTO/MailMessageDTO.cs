using progettoPalestra.Web.Mappings.ModelsDTO.DataDTO;

namespace progettoPalestra.Web.Mappings.ModelsDTO
{
    public class MailMessageDTO
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public MailContact Recipient { get; set; }
        public TestataOrdineDTO Order { get; set; }
    }

    public class MailContact
    {
        public string EmailAdress { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
