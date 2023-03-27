import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { TestataOrdineDTO } from "../models/Data/testata-ordine.model";
import { MailMessageDTO } from "../models/mailMessage.model";

@Injectable({providedIn: "root"})
export class OrderService {

    constructor(private http: HttpClient) {}

    getById(id: number): Observable<TestataOrdineDTO> {
        return this.http.get<TestataOrdineDTO>(environment.apiFullUrl + '/testataordine/' + id);
    }

    saveOrder(order: TestataOrdineDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + '/testataordine/', order);
    }

    sendMailToUser(mail: MailMessageDTO): Observable<any> {
        return this.http.post<any>(environment.apiFullUrl + "/testataordine/sendSummaryMail", mail);
    }
    
    // sendMailToAdmin(ID: Number): Observable<any> {
    //     return this.http.post<any>(environment.apiFullUrl + "/testataordine/MailToAdmin", ID);
    // }
}