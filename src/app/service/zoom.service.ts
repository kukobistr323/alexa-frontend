import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Zoom} from '../model/zoom';

@Injectable({providedIn: 'root'})
export class ZoomService extends HttpService {

  constructor(private httpClient: HttpClient,
              router: Router) {
    super(router);
  }

  logOutFromZoom() {
    const headers = this.createHeaderForBackend();
    return this.httpClient.delete(`${environment.backendUrl}/zoom`, {headers});
  }

  getConnectedAccount() {
    const headers = this.createHeaderForBackend();
    return this.httpClient.get<Zoom>(`${environment.backendUrl}/zoom/connected`, {headers});
  }
}
