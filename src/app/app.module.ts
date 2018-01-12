import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import { EventListComponent } from './event-list/event-list.component';
import {AppRoutingModule} from "./app-routing.module";
import { CheckInComponent } from './check-in/check-in.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RequirementsComponent } from './purchase/requirements/requirements.component';
import { WarningDialogComponent } from './purchase/warning-dialog/warning-dialog.component';
import { FancyInputComponent } from './shared/fancy-input/fancy-input.component';
import { StudentInfoComponent } from './shared/student-info/student-info.component';
import {
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatTableModule
} from "@angular/material";
import { EventDetailsComponent } from './event-list/event-details/event-details.component';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    CheckInComponent,
    PurchaseComponent,
    RequirementsComponent,
    WarningDialogComponent,
    FancyInputComponent,
    StudentInfoComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
