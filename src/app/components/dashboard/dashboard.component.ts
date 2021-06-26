import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts: Account[] | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
    this.httpClient.get<Account[]>(`${environment.backendUrl}/accounts`, {headers})
      .subscribe(response => this.accounts = response);
  }

  addAccount(account: Account) {
    this.accounts?.unshift(account);
  }
}
