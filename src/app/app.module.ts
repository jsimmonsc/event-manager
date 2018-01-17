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
  MatStepperModule, MatTableModule, MatTooltipModule, MatProgressSpinnerModule, MatDialogModule
} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { CheckInComponent } from './check-in/check-in.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RequirementsComponent } from './purchase/requirements/requirements.component';
import { WarningDialogComponent } from './purchase/warning-dialog/warning-dialog.component';
import { FancyInputComponent } from './shared/fancy-input/fancy-input.component';
import { StudentInfoComponent } from './shared/student-info/student-info.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    CreateEventComponent,
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
