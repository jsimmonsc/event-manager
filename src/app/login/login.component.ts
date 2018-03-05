import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  constructor(public authService: AuthService, private router: Router, private elementRef: ElementRef) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['/events']);
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#2e7d32";
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#d9d9d9";
  }

}
