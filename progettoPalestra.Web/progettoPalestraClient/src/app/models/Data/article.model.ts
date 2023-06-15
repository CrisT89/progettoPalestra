import { LookupDTO } from "../lookup.model";
import { CategoryDTO } from "./category.model";
/* 
Modello per l'articolo
*/

export class ArticleDTO {

    constructor(iva: number) {
        this.Iva = iva;
        // if (this.IVA==null) {
        //     this.PriceWithIVA = this.Price;
        // }
        // else {
        //     this.PriceWithIVA = this.Price*(1+this.IVA/100);
        // }
    }

    ID: number;
    Code: string;
    Name: string;
    Description: string;
    Price: number;
    DiscountPrice: number;
    Iva: number;
    ImagePath: string;
    ImageData: string;
    EndOfValidity: Date;
    Suspended: boolean;
    InEvidence: boolean;

    Category: CategoryDTO;
    // Category: LookupDTO;
    FK_Category: number;

    UpdateDate: Date;

    quantity?: number;
    totalPrice?: number;

}