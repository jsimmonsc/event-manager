import {Component, ElementRef, ViewChild} from '@angular/core';
import {Student} from "../shared/models/student.model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../shared/services/event/event.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Attendee} from "../shared/models/attendee.model";
import {Event} from "../shared/models/event.model";

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

  constructor(private route: ActivatedRoute, private eventService: EventService, private fb: FormBuilder) {
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

  private searchForStudent(studentNumber: string, type: string): void {
    if (type === 'student') {
      this.purchaseForm.reset();
    } else if (type === 'guest') {
      this.purchaseForm.get('guestForm.pattonvilleGuest').reset();

      if (+studentNumber === this.purchaseForm.get('student').value.student_number) {
        // TODO: Display error about guest not being able to be the student
        return;
      }
    }

    if (+studentNumber) {
      this.eventService.getAttendeeFromEvent(this.id, +studentNumber).subscribe((att: Attendee) => {
        console.log("Error, student already registered.");
        // TODO: Error dialog
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
          console.log(err);
          // TODO: Connection error dialog
        }
      });
    }

  }

  checkboxChanged(): void {
    this.purchaseForm.get('guestForm.pattonvilleGuest').reset();
    this.purchaseForm.get('guestForm.outsideGuest').reset();
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
        console.log("invalid");
        // TODO: Error invalid guest form
        return;
      }
    }

    this.eventService.createAttendee(this.id, saveAttendee).subscribe((event: Event) => {
      console.log("Attendee created.");
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
          console.log("Guest Attendee created.");
          // TODO: Attendee added dialog
        }, (err) => {
          // TODO: Error connection failed
          console.log(err);
        });
      }
      this.purchaseForm.reset();
      // TODO: Attendee added dialog
    }, (err) => {
      // TODO: Error connection failed
      console.log(err);
    });
  }

  checkGuestValidity(obj: any): boolean {
    for (const key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }
}
