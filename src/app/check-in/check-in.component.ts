import {Component, ViewChild} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
import {FancyInputComponent} from "../shared/fancy-input/fancy-input.component";
import {EventService} from "../shared/services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent {

  id: string;
  attendee: Attendee;
  @ViewChild('idInput') idInputRef: FancyInputComponent;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  searchForAttendee(studentNumber: number): void {
    this.eventService.getAttendeeFromEvent(this.id, studentNumber).subscribe(att => {
      this.attendee = att;
    }, err => {
      console.log("There was an error: " + JSON.stringify(err));
    });
  }
}
