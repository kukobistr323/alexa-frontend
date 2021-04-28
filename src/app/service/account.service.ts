import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../model/account';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class AccountService {
  public accounts: Account[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAccounts() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('googleToken')}`
    });
    return this.httpClient.get<Account[]>(`${environment.url}/accounts`, {headers})
      .pipe(tap(accounts => this.accounts = accounts));
  }
}
