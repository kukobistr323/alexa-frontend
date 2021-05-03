import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Zoom} from '../../model/zoom';
import {Router} from '@angular/router';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  zoomConnected: Zoom | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  isAuthorized() {
    return this.zoomConnected?.isZoomConnected;
  }

  signInZoom() {
    window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${environment.zoomClientId}&redirect_uri=${environment.frontendUrl}/authorize`;
  }

  logOutFromZoom() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
    this.httpClient.delete(`${environment.backendUrl}/zoom`, {headers})
      .subscribe(() => window.location.reload());
  }

  getZoomEmail() {
    return this.zoomConnected?.email;
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
    this.httpClient.get<Zoom>(`${environment.backendUrl}/zoom/connected`, {headers})
      .subscribe(response => this.zoomConnected = response,
        error => this.handleUnauthorized(error));
  }

  handleUnauthorized(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }
}
