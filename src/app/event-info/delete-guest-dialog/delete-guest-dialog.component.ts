import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DeleteWarningDialogComponent} from "../delete-warning-dialog/delete-warning-dialog.component";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {EventService} from "../../shared/services/event/event.service";

@Component({
  selector: 'app-delete-guest-dialog',
  templateUrl: './delete-guest-dialog.component.html',
  styleUrls: ['./delete-guest-dialog.component.scss']
})
export class DeleteGuestDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private matDialog: MatDialog,
              private errorDialog: SlidingDialogService) {
  }

  removeGuest() {
    this.eventService.getAttendeeFromEvent(this.data.eventID, this.data.attendee.guestId).subscribe(guest => {
      if (guest) {
        this.eventService.deleteAttendee(this.data.eventID, guest).subscribe(val => {
          this.dialogRef.close(val);
        }, err => {
          this.errorDialog.displayNotification(err.message, SlidingDialogType.ERROR);
        });
      }
    });
  }

}
