import {Component, ElementRef, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckbox, MatDialogRef} from "@angular/material";
import {Attendee} from "../../shared/models/attendee.model";
import {Guest} from "../../shared/models/guest.model";
import {EventService} from "../../shared/services/event.service";

@Component({
  selector: 'app-edit-attendee-dialog',
  templateUrl: './edit-attendee-dialog.component.html',
  styleUrls: ['./edit-attendee-dialog.component.scss']
})
export class EditAttendeeDialogComponent {

  changedAttendee: Attendee;
  pattonvilleGuest: any;

  constructor(public dialogRef: MatDialogRef<EditAttendeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService) {
    this.changedAttendee = Object.assign({}, data.attendee);
    if (this.changedAttendee.guestId > 0) {
      this.searchForGuest(this.changedAttendee.guestId + '');
    }
  }

  searchForGuest(studentNumber: string): void {
    if (+studentNumber === this.changedAttendee.student_number) {
      // TODO: error about attendee cant be guest
      console.log("Attendee cannot be the guest of themself.");
    } else if (+studentNumber) {

      this.eventService.getStudent(+studentNumber).subscribe(value => {
        this.pattonvilleGuest = value;
      }, err => {
        console.log(err);
        // TODO: Error Dialog
      });
    }
  }

  hasGuestCheckboxChanged(): void {
    this.pattonvilleGuest = null;
    this.changedAttendee.guest = null;
    this.changedAttendee.guestId = -1;
  }

  hasPattonvilleGuestCheckboxChanged(checkbox: MatCheckbox) {
    if (checkbox.checked) {
      this.changedAttendee.guest = { name: null, age: null, phone: null, school: null };
    } else {
      this.changedAttendee.guestId = -1;
    }
  }
}
