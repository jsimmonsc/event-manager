import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";
import {Event} from "../shared/models/event.model";
import {ErrorStateMatcher, MatDialog} from "@angular/material";
import {EventService} from "../shared/services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteEventDialogComponent} from "./delete-event-dialog/event-delete-dialog.component";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  formGroup: FormGroup;
  private eventID: string;
  private savedEvent: Event;
  private savedEventName: string;
  private savedEventDescription: string;
  private savedEventDate: Date;
  private savedEventCost: string;
  private savedEventAttendaceRequirement: boolean;
  private savedEventFinesRequirement: boolean;
  isNewEvent: boolean;
  attendanceChecked = false;
  finesChecked = false;
  eventNameCtrl = new FormControl('', [Validators.required]);
  eventDescriptionCtrl = new FormControl('');
  dateCtrl = new FormControl('', [Validators.required]);
  costCtrl = new FormControl('', [Validators.required]);

  matcher = new CustomErrorStateMatcher();



  constructor(private formBuilder: FormBuilder,
              private slidingDialog: SlidingDialogService,
              private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.savedEventName = " ";
    this.savedEventDescription = " ";
    this.savedEventDate = new Date();
    this.savedEventCost = " ";
    this.savedEventAttendaceRequirement = false;
    this.savedEventFinesRequirement = false;
    this.createForm();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      if (params['id'] !== undefined) {
        this.eventID = params['id'];
        this.eventService.getEvent(this.eventID).subscribe(event => {
          this.savedEvent = event;
          this.savedEventName = this.savedEvent.name;
          this.savedEventDescription = this.savedEvent.description;
          this.savedEventDate = this.savedEvent.date;
          this.savedEventCost = this.savedEvent.cost.toString();
          this.savedEventAttendaceRequirement = this.savedEvent.requirements.attendance;
          this.savedEventFinesRequirement = this.savedEvent.requirements.fines;
        });
        this.isNewEvent = false;
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
    });

  }

  deleteEvent() {

    const confirmationDialogRef = this.dialog.open(DeleteEventDialogComponent, { data: { eventID: this.eventID } });

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
    let newAttendees = null;

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

  inputIsInvalid(): boolean {

    return this.getFormValue("eventNameCtrl") === "" ||
      this.getFormValue("dateCtrl") === "" ||
      this.getFormValue("costCtrl") === "";

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
        eventNameCtrl: this.eventNameCtrl,
        eventDescriptionCtrl: this.eventDescriptionCtrl,
        dateCtrl: this.dateCtrl,
        costCtrl: this.costCtrl
    });
  }

  getPropertyValue(property: string) {

    if (this.isNewEvent) {
      return "";
    } else {

      switch (property) {
        case "name":
          return this.savedEventName;
        case "description":
          return this.savedEventDescription;
        case "date":
          return this.savedEventDate;
        case "cost":
          return this.savedEventCost;
        case "attendance":
          return this.savedEventAttendaceRequirement;
        case "fines":
          return this.savedEventFinesRequirement;
      }

    }


  }

}

export class CustomErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

