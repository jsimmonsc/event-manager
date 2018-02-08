import {Component, EventEmitter, Inject} from '@angular/core';
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
  public eventEmitter: EventEmitter<Event>;

  constructor(private dialogRef: MatDialogRef<EditAttendeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private matDialog: MatDialog,
              private fb: FormBuilder) {
    this.eventEmitter = new EventEmitter<Event>();
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
        comment: this.changedAttendee.comment
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
    this.editGroup.get('guestEdit').reset();
  }

  hasPattonvilleGuestCheckboxChanged(checkbox: MatCheckbox) {
    if (checkbox.checked) {
      this.editGroup.get('guestEdit.outsideGuest').reset();
    } else {
      this.editGroup.get('guestEdit.pattonvilleGuest').reset();
      this.pattonvilleGuest = null;
    }
  }

  saveEditedAttendee() {
    const savedAttendee: Attendee = {
      _id: this.changedAttendee._id,
      first_name: this.changedAttendee.first_name,
      last_name: this.changedAttendee.last_name,
      student_number: this.changedAttendee.student_number,
      grade_level: this.changedAttendee.grade_level,
      guestId: -1,
      guest: null,
      timestamp: this.changedAttendee.timestamp,
      comment: this.editGroup.get('extraEdit.comment').value
    };

    if (this.pattonvilleGuest) {
      savedAttendee.guestId = this.pattonvilleGuest.student_number;
      savedAttendee.guest = {
        name: this.pattonvilleGuest.first_name + ' ' + this.pattonvilleGuest.last_name,
        school: null,
        age: null,
        phone: null
      };
    } else if (this.outsideGuestIsValid()) {
      savedAttendee.guest = this.editGroup.get('guestEdit.outsideGuest').value;
    }

    this.eventService.updateAttendee(this.data.eventID, savedAttendee).subscribe((value: Event) => {

      if (this.changedAttendee.guestId !== savedAttendee.guestId) {
        if (this.changedAttendee.guestId !== -1) {
          this.eventService.getAttendeeFromEvent(this.data.eventID, this.changedAttendee.guestId).subscribe(old => {
            this.eventService.deleteAttendee(this.data.eventID, old).subscribe(value => {
              this.dialogRef.close(value);
            });
          });
        }
        if (savedAttendee.guestId !== -1) {
          this.eventService.getStudent(savedAttendee.guestId).subscribe(guestStudent => {
            const guest: Attendee = {
              _id: null,
              first_name: guestStudent.first_name,
              last_name: guestStudent.last_name,
              student_number: guestStudent.student_number,
              grade_level: guestStudent.grade_level,
              guest: {name: "of " + savedAttendee.first_name + " " + savedAttendee.last_name,
                age: null,
                phone: null,
                school: "Pattonville HS"},
              guestId: -1,
              timestamp: null,
              comment: null
            };

            this.eventService.createAttendee(this.data.eventID, guest).subscribe(value => {
              this.dialogRef.close(value);
            });
          });
        }
      } else {
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

  outsideGuestIsValid(): boolean {
    const guest = this.editGroup.get('guestEdit.outsideGuest').value;
    return guest.name && guest.school && guest.age && guest.phone;
  }
}
