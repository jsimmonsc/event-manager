import { Title } from '@angular/platform-browser';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateEventComponent} from "./create-event/create-event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {CheckInComponent} from './check-in/check-in.component';
import {PurchaseComponent} from "./purchase/purchase.component";
import { EventInfoComponent } from './event-info/event-info.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  {path: 'checkin/:id', component: CheckInComponent, data: {title: "Check In"}},
  {path: 'events', component: EventListComponent, data: {title: "Events"}},
  {path: 'event/:id', component: EventInfoComponent, data: {title: "Event Info"}},
  {path: 'checkin/:id', component: CheckInComponent, data: {title: "Check In"}},
  {path: 'sell/:id', component: PurchaseComponent, data: {title: "Sell"}},
  {path: 'create', component: CreateEventComponent, data: {title: "Create Event"}},
  {path: 'error', component: ErrorPageComponent, data: {title: "Error"}},

  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
