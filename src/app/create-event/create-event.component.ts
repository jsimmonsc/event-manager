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
    this.route.params.subscribe(params => {

      if (params['id'] !== undefined) {
        this.eventID = params['id'];
        this.eventService.getEvent(this.eventID).subscribe(event => {
          this.savedEvent = event;
        });
        this.isNewEvent = false;
      } else {
        this.isNewEvent = true;
      }
    });

    console.log(this.isNewEvent);

    this.createForm();
  }

  ngOnInit() {

  }

  createEvent() {

    this.eventService.createEvent({
      _id: null,
      name: this.getFormValue("eventNameCtrl"),
      description: this.getFormValue("eventDescriptionCtrl"),
      date: new Date(this.getFormValue("dateCtrl")),
      sales: 0,
      attendees: null
    }).subscribe((event: Event) => {
      this.slidingDialog.displayNotification("Successfully created event", SlidingDialogType.SUCCESS);
      console.log(JSON.stringify(event));
    }, (err) => {
      this.slidingDialog.displayNotification("Error creating event", SlidingDialogType.ERROR);
      console.log(err);
    });
  }

  updateEvent() {

    this.eventService.updateEvent(this.getEventFromInputs())
      .subscribe((event: Event) => {
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
    return {
      _id: this.eventID,
      name: this.getFormValue("eventNameCtrl"),
      description: this.getFormValue("dateCtrl"),
      date: new Date(this.getFormValue("dateCtrl")),
      sales: this.savedEvent.sales,
      attendees: this.savedEvent.attendees
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
          return this.savedEvent.name;
        case "description":
          return this.savedEvent.description;
        case "date":
          console.log(this.savedEvent.date.toDateString());
          return this.savedEvent.date.toDateString();
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

