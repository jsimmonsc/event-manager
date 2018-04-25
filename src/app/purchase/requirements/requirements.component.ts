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
  @Input() isGuest = false;
  @Input() student: Student;
  @Input() event: Event;
  @Input() isGuest = false;

  constructor() {
  }

  allGradesAreEligible() {
    return [9, 10, 11, 12].every(val => this.event.eligible_grades.includes(val));
  }

  studentIsInEligibleGrade() {
    return this.event.eligible_grades.includes(this.student.grade_level);
  }

}
