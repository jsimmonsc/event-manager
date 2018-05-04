import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../../shared/services/auth/auth.service";
import {User} from "../../shared/models/user.model";

@Injectable()
export class CanActivateCheckInGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const allowed = ['admin', 'super', 'checker'];

    return this.authService.checkAuth().map((user: User) => {
      if (user && allowed.includes(user.role)) {
        return true;
      } else {
        this.router.navigate(['/error']);
        return false;
      }
    });
  }
}
