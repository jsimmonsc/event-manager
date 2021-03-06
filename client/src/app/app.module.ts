import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventListComponent} from './event-list/event-list.component';
import {AppRoutingModule} from "./routing/app-routing.module";
import {CreateEventComponent} from './create-event/create-event.component';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTooltipModule
} from "@angular/material";
import {HttpClientModule} from '@angular/common/http';
import {CheckInComponent} from './check-in/check-in.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {RequirementsComponent} from './purchase/requirements/requirements.component';
import {WarningDialogComponent} from './purchase/warning-dialog/warning-dialog.component';
import {StudentInfoComponent} from './shared/student-info/student-info.component';
import {EventInfoComponent} from './event-info/event-info.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {EventService} from "./shared/services/event/event.service";
import * as moment from 'moment-timezone';
import {MomentModule} from "angular2-moment";
import {EditAttendeeDialogComponent} from './event-info/edit-attendee-dialog/edit-attendee-dialog.component';
import {DeleteWarningDialogComponent} from './event-info/delete-warning-dialog/delete-warning-dialog.component';
import {AddAttendeeDialogComponent} from './event-info/add-attendee-dialog/add-attendee-dialog.component';
import {LoginComponent} from './login/login.component';
import {AuthCallbackComponent} from './login/auth-callback/auth-callback.component';
import {JwtModule} from "@auth0/angular-jwt";
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AuthModule} from "./shared/services/auth/auth.module";
import {SlidingDialogService} from "./shared/services/sliding-dialog.service";
import {RestrictInputDirective} from "./restrict-input.directive";
import {EditUserDialogComponent} from './admin-panel/edit-user-dialog/edit-user-dialog.component';
import {AddUserDialogComponent} from './admin-panel/add-user-dialog/add-user-dialog.component';
import {DeleteUserWarningDialogComponent} from './admin-panel/delete-user-warning-dialog/delete-user-warning-dialog.component';
import {DeleteEventDialogComponent} from './create-event/delete-event-dialog/event-delete-dialog.component';
import {DeleteConfirmationDialogComponent} from './create-event/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {CancelConfirmationDialogComponent} from './create-event/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import {PapaParseService} from "ngx-papaparse";
import {DeleteGuestDialogComponent} from './event-info/delete-guest-dialog/delete-guest-dialog.component';
import {TextMaskModule} from "angular2-text-mask";

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
    AddAttendeeDialogComponent,
    DeleteWarningDialogComponent,
    LoginComponent,
    AuthCallbackComponent,
    AdminPanelComponent,
    ErrorPageComponent,
    EventInfoComponent,
    RestrictInputDirective,
    EditUserDialogComponent,
    AddUserDialogComponent,
    DeleteUserWarningDialogComponent,
    DeleteEventDialogComponent,
    DeleteConfirmationDialogComponent,
    CancelConfirmationDialogComponent,
    DeleteGuestDialogComponent
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
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['capstone.psdr3.org:3000', 'localhost:3000']
      }
    }),
    AuthModule.forRoot(),
    MatFormFieldModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    TextMaskModule
  ],
  providers: [
    FormBuilder,
    SlidingDialogService,
    EventService,
    PapaParseService,
    {provide: 'moment', useFactory: (): any => moment},
  ],
  entryComponents: [
    EditAttendeeDialogComponent,
    DeleteWarningDialogComponent,
    EditUserDialogComponent,
    DeleteUserWarningDialogComponent,
    AddUserDialogComponent,
    WarningDialogComponent,
    AddAttendeeDialogComponent,
    WarningDialogComponent,
    DeleteEventDialogComponent,
    DeleteConfirmationDialogComponent,
    CancelConfirmationDialogComponent,
    DeleteGuestDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
