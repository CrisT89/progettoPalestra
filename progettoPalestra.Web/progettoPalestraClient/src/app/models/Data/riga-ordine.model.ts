import { LookupDTO } from "../lookup.model";

export class RigaOrdineDTO {
    ID: number;
    Quantity: number;
    UnitaryPrice: number;
    Iva: number;
    Total: number;
    Name?: string

    Article: LookupDTO;
    FK_Article: number;

    TestataOrdine: LookupDTO;
    FK_TestataOrdine: number;
}