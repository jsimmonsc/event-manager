import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {AuthService} from "./shared/services/auth/auth.service";
import {User} from "./shared/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private title: Title,
              private router: Router,
              public authService: AuthService) {

    if (authService.isAuthenticated()) {
      this.authService.checkAuth().subscribe((val: User) => {
        this.user = val;
      });
      this.authService.scheduleRenewal();
    }

  }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.title.setTitle(event['title']);
        window.scrollTo(0, 0);
      });
  }
}
