import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './../shared/models/event.model';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  events: Event[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.http.get('http://localhost:3000/events').subscribe((data: Event[]) => {
      this.events = data;
      console.log(this.events);
    });

  }

  openEventInfo(event: Event) {
    this.router.navigateByUrl('/event/' + event._id);
  }
}
