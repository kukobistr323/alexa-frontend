import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocialAuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})

export class GoogleComponent implements OnInit {
  reactiveForm: FormGroup | undefined;
  user: SocialUser | undefined;
  isSignedIn: boolean | undefined;

  constructor(private router: Router, private fb: FormBuilder, private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedIn = (user != null);
      console.log(this.user);
    });
  }

  googleSignIn(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => localStorage.setItem('googleToken', user.response.access_token))
      .then(() => this.router.navigate(['/dashboard']));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    this.socialAuthService.signOut();
  }

}
