import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ArticleDTO } from "../../models/Data/article.model";

@Injectable({providedIn:'root'})
export class ArticleService {

    constructor(private http:HttpClient) {}

    getAllArticles(): Observable<ArticleDTO[]> {
        return this.http.get<ArticleDTO[]>(environment.apiFullUrl + '/article/GetAllArticles');
    }

    getById(id: number): Observable<ArticleDTO> {
        return this.http.get<ArticleDTO>(environment.apiFullUrl + '/article/' + id);
    }

    saveArticle(category: ArticleDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + '/article', category);
    }
    
    modifyArticle(id: number, category: ArticleDTO): Observable<any> {
        return this.http.put<any>(environment.apiFullUrl + '/article/' + id, category);
    }

    deleteArticle(id: number): Observable<any> {
        return this.http.delete<any>(environment.apiFullUrl + '/article/' + id);
    }

}