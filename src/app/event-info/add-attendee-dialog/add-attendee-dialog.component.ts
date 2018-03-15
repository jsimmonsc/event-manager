import {Component, Inject, OnInit} from '@angular/core';
import {Attendee} from "../../shared/models/attendee.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatCard} from "@angular/material";
import {EventService} from "../../shared/services/event/event.service";
import {Student} from "../../shared/models/student.model";
import {SuccessfullySavedDialogComponent} from "../successfully-saved-dialog/successfully-saved-dialog.component";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";

@Component({
  selector: 'app-add-attendee-dialog',
  templateUrl: './add-attendee-dialog.component.html',
  styleUrls: ['./add-attendee-dialog.component.scss']
})
export class AddAttendeeDialogComponent {


  addAttendeeForm: FormGroup;
  student: Student;
  attendee: Attendee;

  constructor(private dialogRef: MatDialogRef<AddAttendeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private slidingDialog: SlidingDialogService,
              private eventService: EventService,
              private dialog: MatDialog,
              private fb: FormBuilder
              ) {

    this.addAttendeeForm = this.fb.group({
      idInput: '',
    });
  }

  searchForStudent(studentNumber: string, type: string) {
    // this.eventService.getStudent(+studentNumber).subscribe(student => {
    //   if (type === 'student') {

        if (+studentNumber) {
          this.eventService.getAttendeeFromEvent(this.data.eventID, +studentNumber).subscribe((att: Attendee) => {
            console.log("ERROR: Student already registered.");

            this.slidingDialog.displayNotification("ERROR: Student already registered!", SlidingDialogType.ERROR);
          }, (err) => {
            if (err.status === 404) {

              this.eventService.getStudent(+studentNumber).subscribe(student => {
                if (type === 'student') {
                  this.addAttendeeForm.patchValue({student: student});
                  this.student = student;
                }
              });
            } else {
              console.log(err);
              // TODO: Connection error dialog
            }
          });
        }
    //
    //     this.addAttendeeForm.patchValue({student: student});
    //     this.student = student;
    //     console.log(student);
    //   }
    // });
  }

  submitAttendee(): void {
    const attendee: Attendee = {
      _id: null,
      first_name: this.student.first_name,
      last_name: this.student.last_name,
      student_number: this.student.student_number,
      grade_level: this.student.grade_level,
      guestId: -1,
      guest: null,
      timestamp: null,
      comment: null
    };

    console.log("Attendee Submitted");
    this.eventService.createAttendee(this.data.eventID, attendee).subscribe(value => {
      this.dialogRef.close(value);
      const addDialogRef = this.dialog.open(SuccessfullySavedDialogComponent,
            {data: {eventID: this.data.eventID, }, width: '30%', height: '30%'});

    }, err => {
      console.log(err);
      // TODO: Error dialog
    });
  }


}
