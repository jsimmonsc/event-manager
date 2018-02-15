import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../shared/services/auth/auth.service";

@Injectable()
export class CanActivateCheckInGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.userProfile) { this.router.navigate(['/login']); }
    const allowed = ['admin', 'super', 'checker'];

    return allowed.includes(this.authService.userProfile.role);
  }
}
