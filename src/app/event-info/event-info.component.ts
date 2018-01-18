import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  id: String;
  event: Event;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  goToCheckIn() {
    this.router.navigateByUrl('/checkin/' + this.id);
  }

  goToSellTickets() {
    this.router.navigateByUrl('/sell/' + this.id);
  }
}
