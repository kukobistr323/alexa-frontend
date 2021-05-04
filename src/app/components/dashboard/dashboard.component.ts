import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: Account[] | undefined;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
    this.httpClient.get<Account[]>(`${environment.backendUrl}/accounts`, {headers})
      .subscribe(response => this.data = response);
  }

  createAccount(firstName: string, lastName: string, email: string) {
    const account = {
      firstName,
      lastName,
      email
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
    this.httpClient.post(`${environment.backendUrl}/accounts`, account, {headers})
      .subscribe(() => {
      }, error => this.handleUnauthorized(error));
    // @ts-ignore
    this.data.push(account);
  }

  handleUnauthorized(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }
}
