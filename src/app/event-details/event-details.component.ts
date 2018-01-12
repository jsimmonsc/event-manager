import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core/src/metadata/directives';
import { Event } from '../shared/models/event.model.js';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Input() event: Event;

  constructor(private router: Router) { }

  goToEventDetails() {
    this.router.navigate(["/event", this.event._id]);
  }

  ngOnInit() {
  }

}
