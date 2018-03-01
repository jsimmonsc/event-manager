import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";
import {Event} from "../shared/models/event.model";
import {ErrorStateMatcher} from "@angular/material";
import {EventService} from "../shared/services/event/event.service";
import {ActivatedRoute} from "@angular/router";

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
  private savedEventDate: string;
  private savedEventCost: string;
  isNewEvent: boolean;
  eventNameCtrl = new FormControl('', [Validators.required]);
  eventDescriptionCtrl = new FormControl('');
  dateCtrl = new FormControl('', [Validators.required]);
  costCtrl = new FormControl('', [Validators.required]);

  matcher = new CustomErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private slidingDialog: SlidingDialogService,
              private eventService: EventService,
              private route: ActivatedRoute) {
    this.savedEventName = "";
    this.savedEventDescription = "";
    this.savedEventDate = "";
    this.savedEventCost = "";
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
          this.savedEventDate = this.savedEvent.date.toDateString();
          this.savedEventCost = this.savedEvent.cost.toString();
        });
        this.isNewEvent = false;
      } else {
        this.isNewEvent = true;
      }
    });

  }

  createEvent() {

    this.eventService.createEvent(this.getEventFromInputs()).subscribe((event: Event) => {
      this.slidingDialog.displayNotification("Successfully created event", SlidingDialogType.SUCCESS);
      console.log(JSON.stringify(event));
    }, (err) => {
      this.slidingDialog.displayNotification("Error creating event", SlidingDialogType.ERROR);
      console.log(err);
    });
  }

  updateEvent() {

    this.eventService.updateEvent(this.getEventFromInputs()).subscribe((event: Event) => {
      this.slidingDialog.displayNotification("Successfully updated event", SlidingDialogType.SUCCESS);
      console.log(JSON.stringify(event));
    }, (err) => {
      this.slidingDialog.displayNotification("Error updating event", SlidingDialogType.ERROR);
    });

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
      description: this.getFormValue("dateCtrl"),
      date: new Date(this.getFormValue("dateCtrl")),
      sales: newSales,
      attendees: newAttendees,
      cost: +this.getFormValue("costCtrl")
    };
  }

  inputIsInvalid(): boolean {

    return this.getFormValue("eventNameCtrl") === "" ||
      this.getFormValue("dateCtrl") === "" ||
      this.getFormValue("costCtrl") === "";

  }

  getFormValue(formControl: string): string {
    return this.formGroup.get(formControl).value;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
        eventNameCtrl: this.eventNameCtrl,
        eventDescriptionCtrl: this.eventDescriptionCtrl,
        dateCtrl: this.dateCtrl,
        costCtrl: this.costCtrl
    });
  }

  getPropertyValue(property: string): string {

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

