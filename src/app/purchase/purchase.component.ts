import {Component, DoCheck, ElementRef, ViewChild} from '@angular/core';
import {Student} from "../shared/models/student.model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../shared/services/event.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
      student: [null],
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
        // TODO: Display error about guest not being able to be
        return;
      }
    }

    if (+studentNumber) {
      this.eventService.getStudent(+studentNumber).subscribe(student => {
        if (type === 'student') {
          this.purchaseForm.patchValue({student: student});
        } else if (type === 'guest') {
          this.purchaseForm.patchValue({ guestForm: { pattonvilleGuest: { guest: student }}});
        }
      });
    }

  }

  checkboxChanged(): void {
    this.purchaseForm.get('guestForm.pattonvilleGuest').reset();
    this.purchaseForm.get('guestForm.outsideGuest').reset();
  }
}
