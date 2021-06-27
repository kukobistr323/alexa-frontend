import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../model/account';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpService} from './http.service';

@Injectable({providedIn: 'root'})
export class AccountService extends HttpService {

  constructor(private httpClient: HttpClient,
              router: Router) {
    super(router);
  }

  getAll() {
    const headers = this.createHeaderForBackend();
    return this.httpClient.get<Account[]>(`${environment.backendUrl}/accounts`, {headers});
  }

  create(account: Account) {
    const headers = this.createHeaderForBackend();
    return this.httpClient.post<Account>(`${environment.backendUrl}/accounts`, account, {headers});
  }

  delete(id: number | undefined) {
    const headers = this.createHeaderForBackend();
    return this.httpClient.delete(`${environment.backendUrl}/accounts/${id}`, {headers});
  }
}
