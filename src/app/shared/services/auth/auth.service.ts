import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '2l6EUFcHggByVV3-NIk840wAK3aRwN84',
    domain: 'event-manager.auth0.com',
    redirectUri: 'http://localhost:4200/login/callback',
    responseType: 'token id_token',
  });

  constructor(public router: Router, private http: HttpClient) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {

        console.log(authResult);
        // this.http.post(environment.apiUrl + "/login", { authResult: authResult });

        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/events']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
