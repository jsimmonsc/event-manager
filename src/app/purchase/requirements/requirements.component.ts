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
  @Input() isGuest = false;

  constructor() {
  }

  allGradesAreEligible() {
    return this.event.eligible_grades.includes(9) &&
      this.event.eligible_grades.includes(10) &&
      this.event.eligible_grades.includes(11) &&
      this.event.eligible_grades.includes(12);
  }

  studentIsInEligibleGrade() {
    return this.event.eligible_grades.includes(this.student.grade_level);
  }

}
