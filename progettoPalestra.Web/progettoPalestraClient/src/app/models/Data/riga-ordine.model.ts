import { LookupDTO } from "../lookup.model";

export class RigaOrdineDTO {
    ID: number;
    Quantity: number;
    UnitaryPrice: number;
    Iva: number;
    Total: number;

    Article: LookupDTO;
    FK_Article: number;

    TestataOrdine: LookupDTO;
    FK_TestataOrdine: number;
}