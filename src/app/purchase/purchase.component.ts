import {Component, ElementRef, ViewChild} from '@angular/core';
import {Student} from "../shared/models/student.model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../shared/services/event/event.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Attendee} from "../shared/models/attendee.model";
import {Event} from "../shared/models/event.model";
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {MatDialog} from "@angular/material";
import {WarningDialogComponent} from "./warning-dialog/warning-dialog.component";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {

  private id: string;
  purchaseForm: FormGroup;
  @ViewChild('idInput') private idInput: ElementRef;
  @ViewChild('guestIDInput') private guestIDInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private fb: FormBuilder,
              private errorDialog: SlidingDialogService,
              private authService: AuthService,
              private dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.purchaseForm = this.fb.group({
      idInput: ['', Validators.maxLength(5)],
      student: [null, Validators.required],
      guestForm: this.fb.group({
        hasGuest: [false],
        pattonvilleGuest: this.fb.group({
          guestIDInput: ['', Validators.maxLength(5)],
          guest: [null]
        }),
        outsideGuest: this.fb.group({
          guestName: [''],
          guestSchoolName: [''],
          guestHomePhone: ['', Validators.maxLength(10)],
          guestAge: ['', Validators.maxLength(2)]
        })
      })
    });

  }

  submitAttendee(): void {
    const studentModel: Student = this.purchaseForm.get('student').value;

    const saveAttendee: Attendee = {
      _id: null,
      first_name: studentModel.first_name,
      last_name: studentModel.last_name,
      student_number: studentModel.student_number,
      grade_level: studentModel.grade_level,
      guest: null,
      guestId: -1,
      timestamp: null,
      comment: null
    };

    if (this.purchaseForm.get('guestForm.hasGuest').value) {
      if (this.purchaseForm.get('guestForm.pattonvilleGuest.guest').value) {
        const guest = this.purchaseForm.get('guestForm.pattonvilleGuest.guest').value;

        saveAttendee.guestId = guest.student_number;
        saveAttendee.guest = { name: guest.first_name + ' ' + guest.last_name, age: null, phone: null, school: null };
      } else if (this.checkGuestValidity(this.purchaseForm.get('guestForm.outsideGuest').value)) {
        const outsideGuest = this.purchaseForm.get('guestForm.outsideGuest').value;
        saveAttendee.guest = { name: outsideGuest.guestName,
                               school: outsideGuest.guestSchoolName,
                               age: +outsideGuest.guestAge,
                               phone: +outsideGuest.guestHomePhone};
      } else {
        this.errorDialog.displayNotification("ERROR: Invalid guest form!", SlidingDialogType.ERROR);
        return;
      }
    }

    this.eventService.createAttendee(this.id, saveAttendee).subscribe((event: Event) => {
      if (saveAttendee.guestId > 0) {
        const guestModel = this.purchaseForm.get('guestForm.pattonvilleGuest.guest').value;
        const guestAttendee: Attendee = {
          _id: null,
          first_name: guestModel.first_name,
          last_name: guestModel.last_name,
          student_number: guestModel.student_number,
          grade_level: guestModel.grade_level,
          guest: {name: "of " + studentModel.first_name + " " + studentModel.last_name,
            age: null,
            phone: null,
            school: "Pattonville HS"},
          guestId: -1,
          timestamp: null,
          comment: null
        };

        this.eventService.createAttendee(this.id, guestAttendee).subscribe((e: Event) => {
          this.errorDialog.displayNotification("Guest registered!", SlidingDialogType.SUCCESS, 2000);
        }, (err) => {
          this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
        });
      }
      this.purchaseForm.reset();
      this.errorDialog.displayNotification("Attendee registered!", SlidingDialogType.SUCCESS, 2000);
    }, (err) => {
      this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
    });
  }

  checkboxChanged(): void {
    this.purchaseForm.get('guestForm.pattonvilleGuest').reset();
    this.purchaseForm.get('guestForm.outsideGuest').reset();
  }

  public hasFailedRequirement(student: Student): boolean {
    return student.fines || student.attendance;
  }

  attendeeFailsRequirements(): boolean {
    return this.hasFailedRequirement(this.purchaseForm.get('student').value)
      || (this.purchaseForm.get('guestForm.pattonvilleGuest.guest').value
        && this.hasFailedRequirement(this.purchaseForm.get('guestForm.pattonvilleGuest.guest').value));
  }

  checkGuestValidity(obj: any): boolean {
    for (const key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }

  openWarningDialog() {
    if (this.authService.isAdmin()) {
      const dialogRef = this.dialog.open(WarningDialogComponent);

      dialogRef.afterClosed().subscribe(val => {
        if (val) {
          this.submitAttendee();
        }
      });
    } else {
      this.errorDialog.displayNotification("ERROR: Student has problems with fines or attendance!", SlidingDialogType.ERROR);
    }
  }

  public searchForStudent(studentNumber: string, type: string): void {
    if (type === 'student') {
      this.purchaseForm.reset();
    } else if (type === 'guest') {
      this.purchaseForm.get('guestForm.pattonvilleGuest').reset();

      if (+studentNumber === this.purchaseForm.get('student').value.student_number) {
        this.errorDialog.displayNotification("ERROR: The guest cannot also be the student!", SlidingDialogType.ERROR);
        return;
      }
    }

    if (+studentNumber) {
      this.eventService.getAttendeeFromEvent(this.id, +studentNumber).subscribe((att: Attendee) => {
        this.errorDialog.displayNotification("ERROR: Student already registered in event!", SlidingDialogType.ERROR);
      }, (err) => {
        if (err.status === 404) {

          this.eventService.getStudent(+studentNumber).subscribe(student => {
            if (type === 'student') {
              this.purchaseForm.patchValue({student: student});
            } else if (type === 'guest') {
              this.purchaseForm.patchValue({guestForm: {pattonvilleGuest: {guest: student}}});
            }
          });
        } else {
          this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
        }
      });
    }
  }
}
