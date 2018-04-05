import {Component, Input} from '@angular/core';
import {Student} from "../../shared/models/student.model";
import {Event} from "../../shared/models/event.model";

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss'],
})
export class RequirementsComponent {

  @Input() iconScale = 1;
  @Input() student: Student;
  @Input() event: Event;

  constructor() {
  }

}
