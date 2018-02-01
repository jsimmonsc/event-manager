import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../shared/models/student.model";

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss'],
})
export class RequirementsComponent {

  @Input() student: Student;

  constructor() {
  }

}
