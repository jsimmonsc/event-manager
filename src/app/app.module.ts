import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventListComponent} from './event-list/event-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {CreateEventComponent} from './create-event/create-event.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { CheckInComponent } from './check-in/check-in.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RequirementsComponent } from './purchase/requirements/requirements.component';
import { WarningDialogComponent } from './purchase/warning-dialog/warning-dialog.component';
import { StudentInfoComponent } from './shared/student-info/student-info.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {EventService} from "./shared/services/event/event.service";
import * as moment from 'moment-timezone';
import {MomentModule} from "angular2-moment";
import { EditAttendeeDialogComponent } from './event-info/edit-attendee-dialog/edit-attendee-dialog.component';
import { DeleteWarningDialogComponent } from './event-info/delete-warning-dialog/delete-warning-dialog.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./shared/services/auth/auth.service";
import { AuthCallbackComponent } from './login/auth-callback/auth-callback.component';
import {JwtModule} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    CreateEventComponent,
    CheckInComponent,
    PurchaseComponent,
    RequirementsComponent,
    WarningDialogComponent,
    StudentInfoComponent,
    EventInfoComponent,
    ErrorPageComponent,
    EventInfoComponent,
    EditAttendeeDialogComponent,
    DeleteWarningDialogComponent,
    LoginComponent,
    AuthCallbackComponent
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
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['capstone.psdr3.org:3000']
      }
    })
  ],
  entryComponents: [EditAttendeeDialogComponent, DeleteWarningDialogComponent],
  providers: [EventService, { provide: 'moment', useFactory: (): any => moment }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
