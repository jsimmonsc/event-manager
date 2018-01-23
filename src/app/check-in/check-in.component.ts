import {Component, Inject} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
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

  constructor(private route: ActivatedRoute, private eventService: EventService, @Inject('moment') private moment) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  searchForAttendee(studentNumber: string): void {
    this.attendee = null;
    if (+studentNumber && studentNumber.length === 5) {
      this.eventService.getAttendeeFromEvent(this.id, +studentNumber).subscribe(att => {
        this.attendee = att;

        if (!this.attendee.timestamp) {
          this.attendee.timestamp = this.moment(new Date()).tz("America/Chicago").format();
          console.log(this.attendee.timestamp);
          this.eventService.updateAttendee(this.id, this.attendee).subscribe(newAtt => {
            console.log("Checked in: " + JSON.stringify(newAtt));
          });
        } else {
          // already checked in error
        }
      }, err => {
        console.log("There was an error: " + JSON.stringify(err));
      });
    }
  }
}
