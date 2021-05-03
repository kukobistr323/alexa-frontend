import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Zoom} from '../../model/zoom';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  zoomConnected: Zoom | undefined;

  constructor(private httpClient: HttpClient) {
  }

  isAuthorized() {
    return this.zoomConnected?.isZoomConnected;
  }

  signInZoom() {
    window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${environment.zoomClientId}&redirect_uri=${environment.frontendUrl}/authorize`;
  }

  getZoomEmail() {
    // https://api.zoom.us/v2/users/me
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
    this.httpClient.get<Zoom>(`${environment.backendUrl}/zoom/connected`, {headers})
      .subscribe(response => this.zoomConnected = response);
  }

}
