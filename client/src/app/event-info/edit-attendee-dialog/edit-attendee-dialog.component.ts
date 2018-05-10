import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckbox, MatDialog, MatDialogRef} from "@angular/material";
import {Attendee} from "../../shared/models/attendee.model";
import {EventService} from "../../shared/services/event/event.service";
import {DeleteWarningDialogComponent} from "../delete-warning-dialog/delete-warning-dialog.component";
import {Event} from "../../shared/models/event.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {DeleteGuestDialogComponent} from "../delete-guest-dialog/delete-guest-dialog.component";

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
  phoneInputMask: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  event: Event;

  constructor(private dialogRef: MatDialogRef<EditAttendeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private matDialog: MatDialog,
              private fb: FormBuilder,
              private errorDialog: SlidingDialogService) {
    this.eventEmitter = new EventEmitter<Event>();
    this.changedAttendee = Object.assign({}, data.attendee);

    this.eventService.getEvent(this.data.eventID).subscribe(val => {
      this.event = val;
    });

    if (this.changedAttendee.guestId > 0) {
      this.eventService.getStudent(this.changedAttendee.guestId).subscribe(value => {
        this.pattonvilleGuest = value;
      });
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
        comment: this.changedAttendee.comment,
        amountPaid: this.changedAttendee.amountPaid
      })
    });
  }

  searchForGuest(studentNumber: string): void {
    if (+studentNumber === this.changedAttendee.student_number) {
      this.errorDialog.displayNotification("ERROR: Attendee can be the guest of themself.", SlidingDialogType.ERROR);
    } else if (+studentNumber) {

      this.eventService.getAttendeeFromEvent(this.data.eventID, +studentNumber).subscribe(val => {
        this.errorDialog.displayNotification("ERROR: This student is already registered in this event!", SlidingDialogType.ERROR);
      }, err => {
        if (err.status === 404) {
          this.eventService.getStudent(+studentNumber).subscribe(value => {
            this.pattonvilleGuest = value;
          }, error => {
            this.errorDialog.displayNotification(error.message, SlidingDialogType.ERROR);
          });
        } else {
          this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
        }
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
      comment: this.editGroup.get('extraEdit.comment').value,
      amountPaid: this.editGroup.get('extraEdit.amountPaid').value
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
      const newGuest = this.editGroup.get('guestEdit.outsideGuest').value;

      savedAttendee.guest = {
        name: newGuest.name,
        school: newGuest.school,
        age: +newGuest.age,
        phone: newGuest.phone ? +newGuest.phone.replace(/\D/g, '') : null
      };
    }

    this.eventService.updateAttendee(this.data.eventID, savedAttendee).subscribe((value: Event) => {

      if (this.changedAttendee.guestId !== savedAttendee.guestId) {
        if (this.changedAttendee.guestId !== -1) {
          this.eventService.getAttendeeFromEvent(this.data.eventID, this.changedAttendee.guestId).subscribe(old => {
            this.eventService.deleteAttendee(this.data.eventID, old).subscribe(event => {
              this.dialogRef.close(event);
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
              comment: null,
              amountPaid: 0
            };

            this.eventService.createAttendee(this.data.eventID, guest).subscribe(event => {
              this.dialogRef.close(event);
            });
          });
        }
      }
      this.dialogRef.close(value);
    }, err => {
      this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
    });
  }

  openDeleteWarningDialog() {
    const warningRef = this.matDialog.open(DeleteWarningDialogComponent, { data: this.data });
    warningRef.afterClosed().subscribe(value => {
      if (value) {
        if (this.changedAttendee.guestId > 0) {
          const guestWarningRef = this.matDialog.open(DeleteGuestDialogComponent, {data: this.data});

          guestWarningRef.afterClosed().subscribe(guest => {
            this.dialogRef.close(guest);
          });
        } else {
          this.dialogRef.close(value);
        }
      }
    });
  }

  outsideGuestIsValid(): boolean {
    const guest = this.editGroup.get('guestEdit.outsideGuest').value;
    return guest.name || guest.school || guest.age || guest.phone;
  }

  roundMoney(num: number): string {
    return parseFloat("" + Math.round(num * 100) / 100).toFixed(2);
  }
}
