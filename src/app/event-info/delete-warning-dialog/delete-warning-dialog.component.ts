import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {EventService} from "../../shared/services/event/event.service";
import {Attendee} from "../../shared/models/attendee.model";

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning-dialog.component.html',
  styleUrls: ['./delete-warning-dialog.component.scss']
})
export class DeleteWarningDialogComponent {

  attendee: Attendee;

  constructor(private dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private matDialog: MatDialog) {

    this.attendee = data.attendee;

  }

  removeAttendee(): void {
    this.eventService.deleteAttendee(this.data.eventID, this.attendee).subscribe(value => {
      this.dialogRef.close(value);
    }, err => {
      console.log(err);
      // TODO: Error dialog
    });
  }

}
