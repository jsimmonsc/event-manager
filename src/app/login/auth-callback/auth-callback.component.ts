import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent {

  constructor(public router: Router, public authService: AuthService) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['/events']);
    } else {
      this.authService.handleAuthentication();
    }
  }
}
