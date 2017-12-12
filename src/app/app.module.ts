import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';

const appRoutes: Routes = [
  {path: 'events', component: EventListComponent, data: {title: "Events"}},
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
  declarations: [
    AppComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
