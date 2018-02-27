import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EventListComponent} from "../event-list/event-list.component";
import {CheckInComponent} from '../check-in/check-in.component';
import {PurchaseComponent} from "../purchase/purchase.component";
import {EventInfoComponent} from '../event-info/event-info.component';
import {CreateEventComponent} from "../create-event/create-event.component";
import {ErrorPageComponent} from '../error-page/error-page.component';
import {LoginComponent} from "../login/login.component";
import {AuthCallbackComponent} from "../login/auth-callback/auth-callback.component";
import {AuthGuard} from "./guards/auth.guard";
import {CanActivateCreateGuard} from "./guards/can-activate-create.guard";
import {CanActivateEventGuard} from "./guards/can-activate-event.guard";
import {CanActivateSellGuard} from "./guards/can-activate-sell.guard";
import {CanActivateCheckInGuard} from "./guards/can-activate-check-in.guard";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {CanActivateAdminPanelGuard} from "./guards/can-activate-admin-panel.guard";

const appRoutes: Routes = [

  {
    path: 'checkin/:id',
    component: CheckInComponent,
    data: {title: "Check In"},
    canActivate: [
      AuthGuard,
      CanActivateCheckInGuard
    ]
  },
  {
    path: 'events',
    component: EventListComponent,
    data: {title: "Events"},
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'event/:id',
    component: EventInfoComponent,
    data: {title: "Event Info"},
    canActivate: [
      AuthGuard,
      CanActivateEventGuard
    ]
  },
  {
    path: 'sell/:id',
    component: PurchaseComponent,
    data: {title: "Sell"},
    canActivate: [
      AuthGuard,
      CanActivateSellGuard
    ]
  },
  {
    path: 'create',
    component: CreateEventComponent,
    data: {title: "Create Event"},
    canActivate: [
      AuthGuard,
      CanActivateCreateGuard
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {title: "Error"},
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    data: {title: "Admin"},
    canActivate: [
      AuthGuard,
      CanActivateAdminPanelGuard
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: "Log In"},
  },
  {
    path: 'login/callback',
    component: AuthCallbackComponent,
    data: {title: ''}
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, CanActivateCreateGuard, CanActivateEventGuard, CanActivateSellGuard, CanActivateCheckInGuard, CanActivateAdminPanelGuard]
})
export class AppRoutingModule {

}
