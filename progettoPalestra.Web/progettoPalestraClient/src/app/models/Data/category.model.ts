// Modello per la categoria

import { ArticleDTO } from "./article.model";

export class CategoryDTO {
    ID: number;
    Name: string;
    Description: string;
    Label: string;

    Articles: ArticleDTO[];
}