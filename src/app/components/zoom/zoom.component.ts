import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  constructor() {
  }

  signInZoom() {
    window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${environment.zoomClientId}&redirect_uri=${environment.frontendUrl}/authorize`;
  }

  ngOnInit(): void {
  }

}
