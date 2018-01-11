import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { EventListComponent } from './event-list/event-list.component';
import {AppRoutingModule} from "./app-routing.module";
import { CreateEventComponent } from './create-event/create-event.component';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatInputModule, MatNativeDateModule,
  MatStepperModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { EventDetailsComponent } from './event-details/event-details.component';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    CreateEventComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
