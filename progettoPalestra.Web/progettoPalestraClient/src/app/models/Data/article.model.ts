/* 
Modello per l'articolo
*/

import { CategoryDTO } from "./category.model";

export class ArticleDTO {
    ID: number;
    Code: string;
    Name: string;
    Description: string;
    Price: number;
    DiscountPrice: number;
    IVA: number;
    ImagePath: string;
    ImageData: string;
    EndOfValidity: Date;
    Suspended: boolean;
    InEvidence: boolean;

    Category: CategoryDTO;
    FK_Category: number;
}