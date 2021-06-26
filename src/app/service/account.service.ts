import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Account} from '../model/account';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  createAccount(account: Account) {
    const headers = this.createHeaders();
    return this.httpClient.post<Account>(`${environment.backendUrl}/accounts`, account, {headers});
  }

  private createHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
  }
}
