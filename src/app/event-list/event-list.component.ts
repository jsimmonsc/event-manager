import {Router} from '@angular/router';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Event} from './../shared/models/event.model';
import {EventService} from "../shared/services/event/event.service";
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {

  events: Event[] = [];

  constructor(private router: Router,
              private eventService: EventService,
              private elementRef: ElementRef,
              private errDialog: SlidingDialogService) {
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => this.events = events.sort((a, b) => {
      return a.date > b.date ? -1 : 1;
    }), err => this.errDialog.displayNotification(err.message, SlidingDialogType.ERROR));
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#2e7d32";
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "#d9d9d9";
  }

  openEventInfo(event: Event) {
    this.router.navigateByUrl('/event/' + event._id);
  }
}
