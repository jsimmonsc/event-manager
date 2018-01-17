import {Component, ViewChild} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
import {FancyInputComponent} from "../shared/fancy-input/fancy-input.component";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent {

  private student: boolean;
  private showSpinner: boolean;
  private attendee: Attendee;
  @ViewChild('idInput') idInputRef: FancyInputComponent;

  constructor() {
    this.attendee = {
      student_number: 12345,
      first_name: "Test",
      last_name: "Person",
      full_name: "Test Person",
      grade_level: 12,
      guest: "Test Guest",
      ticket_number: 1,
      guestId: null,
      numTickets: 1,
      timestamp: null
    };
  }


  show(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.student = true;
      this.showSpinner = false;
    }, 500);
  }
}
