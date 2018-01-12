import {Component} from '@angular/core';
import {Event} from "../shared/models/event.model";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {

  events: Event[] = [
    {
      _id: "a",
      name: "Test Event",
      description: "doin stuff",
      date: new Date(),
      parameters: {
        has_guests: true,
        requires_fines: true,
        requires_attendance: true,
        requires_discipline: true,
      },
      attendees: []
    },
    {
      _id: "b",
      name: "Test Event 2",
      description: "doin stuff",
      date: new Date(),
      parameters: {
        has_guests: true,
        requires_fines: true,
        requires_attendance: true,
        requires_discipline: true,
      },
      attendees: []
    }
  ];

  constructor() {
  }
}
