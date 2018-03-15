import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../models/user.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {

  userProfile: User;
  refreshSubscription: any;

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0ClientID,
    domain: 'event-manager.auth0.com',
    redirectUri: environment.clientURI + '/login/callback',
    audience: 'http://capstone.psdr3.org:3000',
    responseType: 'token id_token',
    scope: 'openid email'
  });

  constructor(public router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) {
    if (this.isAuthenticated()) {
      this.checkAuth().subscribe((val: User) => {
        this.userProfile = val;
      });
    }
  }

  public login(): void {
    this.auth0.authorize();
  }

  public isAdmin(): boolean {
    return this.userProfile.role === 'super' || this.userProfile.role === 'admin';
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.logout();

        this.http.post(environment.apiUrl + "/authorize",
          {email: this.jwtHelper.decodeToken(authResult.idToken).email, token: authResult.accessToken},
          {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + authResult.accessToken
            })
          }).subscribe((res: User): void => {
          window.location.hash = '';
          this.setSession(authResult);
          this.userProfile = res;
          this.router.navigate(['/events']);
        }, error => {
          this.router.navigate(['/']);
          console.log(error);
        });

      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;

    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public checkAuth(): Observable<User> {
    const idToken = localStorage.getItem("id_token");
    const accessToken = localStorage.getItem("access_token");


    return this.http.post<User>(environment.apiUrl + "/isauth", {email: this.jwtHelper.decodeToken(idToken).email, token: accessToken},
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken
        })
      });
  }

  public createUser(user: User): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<User>(API_URL + '/users/create', user, {headers: headers});
  }

  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/users');
  }

  public deleteUser(user: User): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<User>(API_URL + '/users/remove', user, {headers: headers});
  }

  public updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<User>(API_URL + '/users', user, {headers: headers});
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.http.post(environment.apiUrl + "/authorize",
          {email: this.jwtHelper.decodeToken(result.idToken).email, token: result.accessToken},
          {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + result.accessToken
            })
          }).subscribe((value: User) => {
          this.setSession(result);
          this.userProfile = value;
        });
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) {
      return;
    }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expires => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expires - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) {
      return;
    }
    this.refreshSubscription.unsubscribe();
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }
}
