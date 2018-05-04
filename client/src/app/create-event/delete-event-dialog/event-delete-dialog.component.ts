import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.scss']
})
export class DeleteEventDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog
  ) {}

  openConfirmationDialog() {

    this.dialog.closeAll();
    this.dialog.open(DeleteConfirmationDialogComponent, { data: { eventID: this.data.eventID}});

  }

}
