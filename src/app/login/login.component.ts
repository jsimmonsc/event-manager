import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              private elementRef: ElementRef,
              private route: ActivatedRoute,
              private errDialog: SlidingDialogService) {
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

  ngOnInit() {
    this.route.paramMap.subscribe(val => {
      if (val.get("error") === "401") {
        setTimeout(() => {
          this.errDialog.displayNotification("Login Unsuccessful: Account not found.", SlidingDialogType.ERROR);
        });
      }
    });
  }
}
