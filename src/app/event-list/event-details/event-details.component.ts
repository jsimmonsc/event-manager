import {Component, Input} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  @Input() event: Event;

  constructor(private router: Router) {

  }

  goToEventInfo() {
    this.router.navigate(['/event', this.event._id]);
  }
}
