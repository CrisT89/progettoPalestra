import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { CategoryDTO } from "../../models/Data/category.model";

@Injectable({providedIn: 'root'})
export class CategoryService {

    constructor(private http: HttpClient){}

    getAllCategories(): Observable<Array<CategoryDTO>> {
        return this.http.get<Array<CategoryDTO>>(environment.apiFullUrl + '/category/GetAllCategories');
    }

    getById(id: number): Observable<CategoryDTO> {
        return this.http.get<CategoryDTO>(environment.apiFullUrl + '/category/' + id);
    }

    saveCategory(category: CategoryDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + '/category', category);
    }
    
    modifyCategory(id: number, category: CategoryDTO): Observable<any> {
        return this.http.put<any>(environment.apiFullUrl + '/category/' + id, category);
    }
    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(environment.apiFullUrl + '/category/' + id);
    }
}