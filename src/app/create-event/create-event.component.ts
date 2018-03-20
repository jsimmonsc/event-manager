import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";
import {Event} from "../shared/models/event.model";
import {ErrorStateMatcher, MatDialog} from "@angular/material";
import {EventService} from "../shared/services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteEventDialogComponent} from "./delete-event-dialog/event-delete-dialog.component";
import {CancelConfirmationDialogComponent} from "./cancel-confirmation-dialog/cancel-confirmation-dialog.component";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  formGroup: FormGroup;
  eventID: string;
  savedEvent: Event;
  isNewEvent: boolean;
  attendanceChecked: boolean;
  finesChecked: boolean;
  eventNameCtrl = new FormControl('', [Validators.required]);
  eventDescriptionCtrl = new FormControl('');
  dateCtrl = new FormControl('', [Validators.required]);
  costCtrl = new FormControl('', [Validators.required]);
  attendanceCtrl = new FormControl('');
  finesCtrl = new FormControl('');

  matcher = new CustomErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private slidingDialog: SlidingDialogService,
              private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.createForm();

  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      if (params['id'] !== undefined) {
        this.eventID = params['id'];
        this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
          this.savedEvent = event;
          this.isNewEvent = false;
          this.setFormValues();

        });
      } else {
        this.isNewEvent = true;
      }

    });

  }

  createEvent() {

    this.eventService.createEvent(this.getEventFromInputs()).subscribe((event: Event) => {
      this.router.navigateByUrl('/events').then(() => {
        this.slidingDialog.displayNotification("Successfully created event", SlidingDialogType.SUCCESS);
      });
      console.log(JSON.stringify(event));
    }, (err) => {
      this.slidingDialog.displayNotification("Error creating event", SlidingDialogType.ERROR);
      console.log(err);
    });
  }

  updateEvent() {

    this.eventService.updateEvent(this.getEventFromInputs()).subscribe((event: Event) => {
      this.router.navigateByUrl('/events').then(() => {
        this.slidingDialog.displayNotification("Successfully updated event", SlidingDialogType.SUCCESS);
      });
      console.log(JSON.stringify(event));
    }, (err) => {
      this.slidingDialog.displayNotification("Error updating event", SlidingDialogType.ERROR);
      console.log(err);
    });

  }

  deleteEvent() {
    this.dialog.open(DeleteEventDialogComponent, { data: { eventID: this.eventID } });
  }


  submitEvent() {
    if (this.isNewEvent) {
      this.createEvent();
    } else {
      this.updateEvent();
    }
  }

  getEventFromInputs(): Event {

    let newID = null;
    let newSales = 0;
    let newAttendees = [];

    if (!this.isNewEvent) {
      newID = this.eventID;
      newSales = this.savedEvent.sales;
      newAttendees = this.savedEvent.attendees;
    }

    return {
      _id: newID,
      name: this.getFormValue("eventNameCtrl"),
      description: this.getFormValue("eventDescriptionCtrl"),
      date: new Date(this.getFormValue("dateCtrl")),
      sales: newSales,
      attendees: newAttendees,
      cost: +this.getFormValue("costCtrl"),
      requirements: {
        attendance: this.attendanceChecked,
        fines: this.finesChecked
      }
    };
  }

  getFormValue(formControl: string) {
    return this.formGroup.get(formControl).value;
  }

  setFormValues() {
    this.attendanceChecked = this.savedEvent.requirements.attendance;
    this.finesChecked = this.savedEvent.requirements.fines;
    this.formGroup.patchValue({
      eventNameCtrl: this.savedEvent.name,
      eventDescriptionCtrl: this.savedEvent.description,
      dateCtrl: this.savedEvent.date,
      costCtrl: this.savedEvent.cost,
      attendanceCtrl: this.savedEvent.requirements.attendance,
      finesCtrl: this.savedEvent.requirements.fines
    });
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
        eventNameCtrl: this.eventNameCtrl,
        eventDescriptionCtrl: this.eventDescriptionCtrl,
        dateCtrl: this.dateCtrl,
        costCtrl: this.costCtrl,
        attendanceCtrl: this.attendanceCtrl,
        finesCtrl: this.finesCtrl
    });
  }

  onAttendanceChanged(event) {
    this.attendanceChecked = event.checked;
  }

  onFinesChanged(event) {
    this.finesChecked = event.checked;
  }

  openCancelDialog() {
    this.dialog.open(CancelConfirmationDialogComponent);
  }

}

export class CustomErrorStateMatcher implements ErrorStateMatcher {

  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

