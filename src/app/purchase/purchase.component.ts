import {Component, ElementRef, ViewChild} from '@angular/core';
import {Student} from "../shared/models/student.model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../shared/services/event.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {

  private id: string;
  purchaseForm: FormGroup;
  @ViewChild('idInput') private idInput: ElementRef;

  constructor(private route: ActivatedRoute, private eventService: EventService, private fb: FormBuilder) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.purchaseForm = this.fb.group({
      idInput: ['', Validators.maxLength(5)],
      student: [null],
      guestForm: this.fb.group({
        // hasGuest: [false],
        // guestName: [''],
        // guestId: [-1],
        // guestSchool: ['']

      })
    });
  }

  private searchForStudent(studentNumber: string): void {
    this.reset();

    if (+studentNumber && studentNumber.length === 5) {
      this.eventService.getStudent(+studentNumber).subscribe(student => {
        this.purchaseForm.patchValue({student: student});
      });
    }
  }

  reset() {
    this.purchaseForm.patchValue({student: null});
    this.idInput.nativeElement.value = null;
  }
}
