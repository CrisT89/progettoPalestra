import { Injectable } from "@angular/core";
import { ArticleDTO } from "../../models/Data/article.model";
import { CategoryDTO } from "../../models/Data/category.model";
import { ArticleService } from "../../services/DataService/article.service";
import { CategoryService } from "../../services/DataService/category.service";

@Injectable()
export class PublicService {

    constructor(private categoryService: CategoryService,
                private articleService: ArticleService) {}

    categoryList: CategoryDTO[];
    articleList: ArticleDTO[];

}