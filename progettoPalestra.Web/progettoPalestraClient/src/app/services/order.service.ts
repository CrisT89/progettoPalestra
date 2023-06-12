import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import {  TestataOrdineDTO } from "../models/Data/testata-ordine.model";
import { MailMessageDTO } from "../models/mailMessage.model";
import { tap } from "rxjs/operators";
import { ArticleStatisticDTO } from "../models/Data/article-statistic.model";

@Injectable({providedIn: "root"})
export class OrderService {

    constructor(private http: HttpClient) {}

    orderListChanged = new Subject<void>();

    getById(id: number): Observable<TestataOrdineDTO> {
        return this.http.get<TestataOrdineDTO>(environment.apiFullUrl + '/testataordine/' + id);
    }

    getAllOrders(): Observable<TestataOrdineDTO[]> {
        return this.http.get<TestataOrdineDTO[]>(environment.apiFullUrl + '/testataordine/GetAllOrders');
    }

    saveOrder(order: TestataOrdineDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + '/testataordine/', order);
    }

    updateStatus(id: number, status: number): Observable<any> {
        return this.http.put<any>(environment.apiFullUrl + '/testataordine/' + id, status)
        .pipe(tap(() =>  this.orderListChanged.next()));
    }

    sendMailToUser(mail: MailMessageDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + "/testataordine/sendSummaryMail", mail);
    }
    
    // sendMailToAdmin(ID: Number): Observable<any> {
    //     return this.http.post<any>(environment.apiFullUrl + "/testataordine/MailToAdmin", ID);
    // }

    getStatistic(query: string): Observable<ArticleStatisticDTO[]> {
        return this.http.get<ArticleStatisticDTO[]>(environment.apiFullUrl + "/vArticle/GetFromView" + query);
    }
}