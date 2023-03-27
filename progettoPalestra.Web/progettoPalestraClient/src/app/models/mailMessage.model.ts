import { AttachmentDTO } from "./attachment.model";
import { TestataOrdineDTO } from "./Data/testata-ordine.model";

export class MailMessageDTO {
    public Subject: string;
    public Body: string;
    public Recipient: MailContact;
    public Order: TestataOrdineDTO;

    // public Attachment: AttachmentDTO;
}

export class MailContact {
    public EmailAdress: string;
    public Name: string;
    public Surname: string;
}