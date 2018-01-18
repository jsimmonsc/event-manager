import {Component, Input} from '@angular/core';
import {Attendee} from "../models/attendee.model";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent {
  @Input() student: Attendee;
}
