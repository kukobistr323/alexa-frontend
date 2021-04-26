import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocialAuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})

export class GoogleComponent implements OnInit {

  reactiveForm: FormGroup | undefined;
  user: SocialUser | undefined;
  isSignedIn: boolean | undefined;

  constructor(private fb: FormBuilder, private socialAuthService: SocialAuthService) {
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
      .then((user: SocialUser) => localStorage.setItem('token', user.response.access_token));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    this.socialAuthService.signOut();
  }

}
