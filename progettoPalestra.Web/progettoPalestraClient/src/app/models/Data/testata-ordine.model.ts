import { RigaOrdineDTO } from "./riga-ordine.model";

export class TestataOrdineDTO {
    ID: number;
    OrderDate: Date;
    OrderTotal: number;
    Name: string;
    Surname: string;
    PhoneNumber: string;
    Email: string;
    PreferredDate?: Date;
    PreferredTime?: Date;
    Adress: string;
    Cap: number;
    City: string;
    Province: string;
    State: string;
    Status: StatusEnum;

    RigheOrdine: RigaOrdineDTO[];
}

export enum StatusEnum {
    WAITING = 1,
    SHIPPED = 2,
    RECEIVED = 3
}