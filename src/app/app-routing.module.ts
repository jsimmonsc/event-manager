import { Title } from '@angular/platform-browser';
import { EventDetailsComponent } from './event-details/event-details.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateEventComponent} from "./create-event/create-event.component";
import {EventListComponent} from "./event-list/event-list.component";

const appRoutes: Routes = [
  {path: 'create-event', component: CreateEventComponent, data: {title: "Create Event"}},
  {path: 'events', component: EventListComponent, data: {title: "Events"}},
  // {path: 'event/:id', component: EventDetailsComponent, data: {title: "Event Details"}},
  {path: 'checkin/:id'},
  {path: 'sell/:id'},
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
