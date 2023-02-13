import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ArticleDTO } from "../../models/Data/article.model";

@Injectable({ providedIn: 'root' })
export class ArticleService {

    constructor(private http: HttpClient) { }

    articleListChanged = new Subject<void>();

    getAllArticles(): Observable<ArticleDTO[]> {
        return this.http.get<ArticleDTO[]>(environment.apiFullUrl + '/article/GetAllArticles');
    }

    getById(id: number): Observable<ArticleDTO> {
        return this.http.get<ArticleDTO>(environment.apiFullUrl + '/article/' + id);
    }

    getInEvidence(): Observable<ArticleDTO[]>{
        return this.http.get<ArticleDTO[]>(environment.apiFullUrl + '/article/GetInEvidence');
    }

    getByCategory(id: number): Observable<ArticleDTO[]> {
        return this.http.get<ArticleDTO[]>(environment.apiFullUrl + '/article/GetByCategory/' + id);
    }

    saveArticle(category: ArticleDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + '/article', category)
            .pipe(tap(() => { this.articleListChanged.next(); }));
    }

    modifyArticle(id: number, category: ArticleDTO): Observable<any> {
        return this.http.put<any>(environment.apiFullUrl + '/article/' + id, category)
            .pipe(tap(() => { this.articleListChanged.next(); }));
    }

    deleteArticle(id: number): Observable<any> {
        return this.http.delete<any>(environment.apiFullUrl + '/article/' + id)
            .pipe(tap(() => { this.articleListChanged.next(); }));
    }

}