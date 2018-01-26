import {Component, forwardRef, Input} from '@angular/core';
import {Attendee} from "../models/attendee.model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Student} from "../models/student.model";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentInfoComponent),
      multi: true
    }
  ]
})
export class StudentInfoComponent implements ControlValueAccessor{
  @Input() student: Student;
  onChange = (_: any) => {};

  writeValue(value: Student) {
    this.student = value;
    this.onChange(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
