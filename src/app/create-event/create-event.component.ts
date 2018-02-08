import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl, FormArray} from '@angular/forms';
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";
import {EventService} from "../shared/services/event.service";
import {Event} from "../shared/models/event.model";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private slidingDialog: SlidingDialogService, private eventService: EventService) {
    this.createForm();
  }

  ngOnInit() {

  }

  createEvent() {

    console.log("creating event...");
    const nameString = this.formGroup.get("eventNameGroup.eventNameCtrl").value;
    console.log(nameString);
    const descriptionString = this.formGroup.get("eventNameGroup.eventDescriptionCtrl").value;
    console.log(descriptionString);
    const dateString = this.formGroup.get("dateGroup.dateCtrl").value;
    console.log(dateString);

    this.slidingDialog.displayNotification("heyo you got a problem", SlidingDialogType.ERROR);

    // this.eventService.createEvent({
    //   _id: null,
    //   name: nameString,
    //   description: descriptionString,
    //   date: new Date(dateString),
    //   sales: 0,
    //   attendees: null
    // }).subscribe((event: Event) => {
    //   this.slidingDialog.displayNotification("Successfully created event", SlidingDialogType.SUCCESS);
    //   console.log(JSON.stringify(event));
    // }, (err) => {
    //   this.slidingDialog.displayNotification("Error creating event", SlidingDialogType.ERROR);
    //   console.log(err);
    // });
  }

  createForm() {

    this.formGroup = this.formBuilder.group({
      eventNameGroup: this.formBuilder.group({
        eventNameCtrl: ['', Validators.required],
        eventDescriptionCtrl: ['', Validators.required]
      }),
      dateGroup: this.formBuilder.group({
        dateCtrl: ['', Validators.required]
      }),
      costGroup: this.formBuilder.group({
        costCtrl: ['', Validators.required]
      })

    });

  }

}
