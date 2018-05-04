import {Component, Inject, OnInit} from '@angular/core';
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {Event} from "../../shared/models/event.model";
import {Router} from "@angular/router";
import {EventService} from "../../shared/services/event/event.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DeleteEventDialogComponent} from "../delete-event-dialog/event-delete-dialog.component";

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {


  constructor(private dialogRef: MatDialogRef<DeleteEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private slidingDialog: SlidingDialogService,
              private router: Router
  ) {}

  deleteEvent() {

    this.eventService.deleteEvent(this.data.eventID).subscribe((event: Event) => {
      this.dialogRef.close(event);
      this.router.navigateByUrl('/events').then(() => {
        this.slidingDialog.displayNotification('Event successfully deleted', SlidingDialogType.SUCCESS);
      });

    }, (err) => {
      this.slidingDialog.displayNotification("Could not delete event", SlidingDialogType.ERROR);
    });

  }

}
