import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
      });
      this.httpClient.post(`${environment.backendUrl}/zoom`, {
          code: queryParams.code
        },
        {headers})
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        });
    });
  }

}
