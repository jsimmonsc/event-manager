import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Object;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    // this.http.get('').subscribe(data => {
    //   this.events = data;
    // });

  }

}
