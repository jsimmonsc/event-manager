import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Event} from './../shared/models/event.model';
import {EventService} from "../shared/services/event.service";


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private router: Router, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => this.events = events);
  }

  openEventInfo(event: Event) {
    this.router.navigateByUrl('/event/' + event._id);
  }
}
