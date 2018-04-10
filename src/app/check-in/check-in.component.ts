import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
import {EventService} from "../shared/services/event/event.service";
import {ActivatedRoute} from "@angular/router";
import {SlidingDialogService, SlidingDialogType} from "../shared/services/sliding-dialog.service";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent {

  id: string;
  attendee: Attendee;
  checkedIn: boolean;
  @ViewChild('idInput') inputRef: ElementRef;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              @Inject('moment') private moment,
              private errorDialog: SlidingDialogService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  searchForAttendee(studentNumber: string): void {
    this.checkedIn = false;
    this.attendee = null;
    this.inputRef.nativeElement.value = '';

    if (+studentNumber && studentNumber.length === 5) {
      this.eventService.getAttendeeFromEvent(this.id, +studentNumber).subscribe(att => {
        this.attendee = att;

        if (!this.attendee.timestamp) {
          this.attendee.timestamp = this.moment(new Date()).tz("America/Chicago").format();
          this.eventService.updateAttendee(this.id, this.attendee).subscribe(newAtt => {
            this.checkedIn = true;
          }, err => {
            this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
          });
        } else {
          this.errorDialog.displayNotification("This attendee is already checked in!", SlidingDialogType.INFO, 2000);
        }
      }, err => {
        if (err.status === 404) {
          this.errorDialog.displayNotification("ERROR: Attendee doesn't exist!", SlidingDialogType.ERROR);
        } else {
          this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
        }
      });
    }
  }
}
