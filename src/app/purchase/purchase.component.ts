import {Component} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
import {WarningDialogComponent} from "./warning-dialog/warning-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {

  dialogRef: MatDialogRef<WarningDialogComponent>;
  student: boolean;
  showSpinner: boolean;
  attendee: Attendee;

  constructor(private dialog: MatDialog) {

  }

  show(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.student = true;
      this.showSpinner = false;
    }, 500);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(WarningDialogComponent, { disableClose: true});
  }

}
