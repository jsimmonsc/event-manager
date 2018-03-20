import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-cancel-confirmation-dialog',
  templateUrl: './cancel-confirmation-dialog.component.html',
  styleUrls: ['./cancel-confirmation-dialog.component.scss']
})
export class CancelConfirmationDialogComponent {

  constructor(private router: Router, private slidingDialog: SlidingDialogService, private dialog: MatDialog) { }

  cancelChanges() {

    this.dialog.closeAll();
    this.router.navigateByUrl('/events').then(() => {
      this.slidingDialog.displayNotification("Cancelled changes", SlidingDialogType.INFO);
    });

  }

}
