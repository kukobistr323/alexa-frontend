import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

export abstract class HttpService {

  protected constructor(private router: Router) {
  }

  createHeaderForBackend() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(environment.googleToken)}`
    });
  }

  handleUnauthorized(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }
}
