import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckInComponent} from './check-in/check-in.component';
import {EventListComponent} from './event-list/event-list.component';
import {PurchaseComponent} from "./purchase/purchase.component";

const appRoutes: Routes = [
  {path: 'checkin/:id', component: CheckInComponent, data: {title: "Check In"}},
  {path: 'events', component: EventListComponent, data: {title: "Events"}},
  {path: 'purchase/:id', component: PurchaseComponent, data: {title: "Sell"}},
//  {path: 'create-event', component: CreateEventComponent, data: {title: "Create Event"}},
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
