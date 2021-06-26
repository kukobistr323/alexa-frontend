import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Zoom} from '../../model/zoom';
import {ZoomService} from '../../service/zoom.service';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  zoomConnected: Zoom | undefined;

  constructor(private zoomService: ZoomService) {
  }

  isAuthorized() {
    return this.zoomConnected?.isZoomConnected;
  }

  signInZoom() {
    window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${environment.zoomClientId}&redirect_uri=${environment.frontendUrl}/authorize`;
  }

  logOutFromZoom() {
    this.zoomService.logOutFromZoom()
      .subscribe(() => window.location.reload(),
        error => this.zoomService.handleUnauthorized(error));
  }

  getZoomEmail() {
    return this.zoomConnected?.email;
  }

  ngOnInit(): void {
    this.zoomService.getConnectedAccount()
      .subscribe(response => this.zoomConnected = response,
        error => this.zoomService.handleUnauthorized(error));
  }
}
