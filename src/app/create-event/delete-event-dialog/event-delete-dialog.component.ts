import {Component, Inject, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EventService} from "../../shared/services/event/event.service";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.scss']
})
export class DeleteEventDialogComponent {

  event: Event;

  constructor(private dialogRef: MatDialogRef<DeleteEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private slidingDialog: SlidingDialogService,
              private router: Router
  ) {
    this.event = data.eventID;
  }

  deleteEvent() {

    this.eventService.deleteEvent(this.data.eventID).subscribe((event) => {
      this.dialogRef.close(event);
      this.router.navigateByUrl('/events').then(() => {
        this.slidingDialog.displayNotification("Event successfully deleted", SlidingDialogType.SUCCESS);
      });

    }, (err) => {
      this.slidingDialog.displayNotification("Could not delete event", SlidingDialogType.ERROR);
    });

  }

}
