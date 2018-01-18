import {Component, ViewChild} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
import {FancyInputComponent} from "../shared/fancy-input/fancy-input.component";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent {

  student: boolean;
  showSpinner = false;
  attendee: Attendee;
  @ViewChild('idInput') idInputRef: FancyInputComponent;

  constructor() {
  }
}
