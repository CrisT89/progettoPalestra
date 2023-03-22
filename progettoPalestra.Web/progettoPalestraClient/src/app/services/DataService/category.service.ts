import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { CategoryDTO } from "../../models/Data/category.model";
import { tap } from "rxjs/operators";


@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private http: HttpClient) { }

    categoryListChanged = new Subject<void>();


    getAllCategories(): Observable<Array<CategoryDTO>> {
        return this.http.get<Array<CategoryDTO>>(environment.apiFullUrl + '/category/GetAllCategories');
    }

    getById(id: number): Observable<CategoryDTO> {
        return this.http.get<CategoryDTO>(environment.apiFullUrl + '/category/' + id);
    }

    getInc(id: number): Observable<CategoryDTO> {
        return this.http.get<CategoryDTO>(environment.apiFullUrl + '/category/inc/' + id);
    }

    saveCategory(category: CategoryDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + '/category', category)
            .pipe(tap(() => { this.categoryListChanged.next(); }));
    }

    modifyCategory(id: number, category: CategoryDTO): Observable<any> {
        return this.http.put<any>(environment.apiFullUrl + '/category/' + id, category)
            .pipe(tap(() => { this.categoryListChanged.next(); }));
    }
    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(environment.apiFullUrl + '/category/' + id)
            .pipe(tap(() => { this.categoryListChanged.next(); }));
    }
}