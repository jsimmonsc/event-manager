import { Component, Inject } from '@angular/core';
import {Router} from "@angular/router";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";

@Component({
  selector: 'app-cancel-confirmation-dialog',
  templateUrl: './cancel-confirmation-dialog.component.html',
  styleUrls: ['./cancel-confirmation-dialog.component.scss']
})
export class CancelConfirmationDialogComponent {

  constructor(private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private slidingDialog: SlidingDialogService,
              private dialog: MatDialog) { }

  cancelChanges() {

    this.dialog.closeAll();
    this.router.navigateByUrl(this.data.isNewEvent ? '/events' : '/event/' + this.data.eventID).then(() => {
      this.slidingDialog.displayNotification("Cancelled changes", SlidingDialogType.INFO);
    });

  }

}
