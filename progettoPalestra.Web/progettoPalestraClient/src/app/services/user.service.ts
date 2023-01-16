import { UserDTO } from '../models/generics/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })

/**
 * Servizio per utenti
 */
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo per ottenere tutti gli utenti dall'API
   */

  getAllUsers(): Promise<Array<UserDTO>> {
    return this.http.get<Array<UserDTO>>(environment.apiFullUrl + '/User/GetAllUsers').toPromise();
  }

  getUserByID(id: number): Promise<UserDTO> {
    return this.http.get<UserDTO>(environment.apiFullUrl + '/User/' + id).toPromise();
  }

  saveUser(user: UserDTO): Promise<any> {
    return this.http.post<any>(environment.apiFullUrl + '/User', user).toPromise()
  }

  deleteUser(id: number): Promise<any> {
    return this.http.delete<any>(environment.apiFullUrl + '/User/' + id).toPromise();
  }

}
