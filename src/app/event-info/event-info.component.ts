import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from "../shared/services/event.service";
import {Event} from "../shared/models/event.model";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  id: string;
  event: Event;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.eventService.getEvent(this.id).subscribe(event => this.event = event);
  }

  goToCheckIn() {
    this.router.navigateByUrl('/checkin/' + this.id);
  }

  goToSellTickets() {
    this.router.navigateByUrl('/sell/' + this.id);
  }
}
