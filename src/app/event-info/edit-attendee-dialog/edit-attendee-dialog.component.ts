import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckbox, MatDialog, MatDialogRef} from "@angular/material";
import {Attendee} from "../../shared/models/attendee.model";
import {EventService} from "../../shared/services/event.service";
import {DeleteWarningDialogComponent} from "../delete-warning-dialog/delete-warning-dialog.component";
import {Event} from "../../shared/models/event.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-attendee-dialog',
  templateUrl: './edit-attendee-dialog.component.html',
  styleUrls: ['./edit-attendee-dialog.component.scss']
})
export class EditAttendeeDialogComponent {

  public changedAttendee: Attendee;
  public pattonvilleGuest: any;
  public editGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditAttendeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private matDialog: MatDialog,
              private fb: FormBuilder) {
    this.changedAttendee = Object.assign({}, data.attendee);
    if (this.changedAttendee.guestId > 0) {
      this.searchForGuest(this.changedAttendee.guestId + '');
    }

    this.editGroup = this.fb.group({
      guestEdit: this.fb.group({
        pattonvilleGuest: this.fb.group({
          guestSID: this.changedAttendee.guestId > 0 ? this.changedAttendee.guestId : ''
        }),
        outsideGuest: this.fb.group({
          name: [this.changedAttendee.guest ? this.changedAttendee.guest.name : '', Validators.required],
          school: [this.changedAttendee.guest ? this.changedAttendee.guest.school : '', Validators.required],
          age: [this.changedAttendee.guest ? this.changedAttendee.guest.age : '', Validators.required],
          phone: [this.changedAttendee.guest ? this.changedAttendee.guest.phone : '', Validators.required]
        })
      }),
      extraEdit: this.fb.group({
        comment: ''
      })
    });
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
    this.editGroup.get('guestEdit').reset();
  }

  hasPattonvilleGuestCheckboxChanged(checkbox: MatCheckbox) {
    if (checkbox.checked) {
      this.changedAttendee.guest = { name: null, age: null, phone: null, school: null };
      this.editGroup.get('guestEdit.outsideGuest').reset();
    } else {
      this.changedAttendee.guestId = -1;
      this.editGroup.get('guestEdit.pattonvilleGuest').reset();
    }
  }

  saveEditedAttendee() {
    this.eventService.updateAttendee(this.data.eventID, this.changedAttendee).subscribe((value: Event) => {
      if (value) {
        this.dialogRef.close(value);
      }
    }, err => {
      console.log(err);
      // TODO: Error dialog
    });
  }

  openDeleteWarningDialog() {
    const warningRef = this.matDialog.open(DeleteWarningDialogComponent, { data: this.data });
    warningRef.afterClosed().subscribe(value => {
      if (value) {
        this.dialogRef.close(value);
      }
    });
  }
}
