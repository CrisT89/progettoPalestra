import { ArticleDTO } from "./article.model";

// Modello per la categoria

export class CategoryDTO {
    ID: number;
    Name: string;
    Description: string;
    Label: string;

    Articles: ArticleDTO[];
}