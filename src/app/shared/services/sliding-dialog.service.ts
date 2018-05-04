import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class SlidingDialogService {

  constructor(public snackBar: MatSnackBar) { }

  displayNotification(message: string, dialogType: SlidingDialogType, duration?: number): void {

    let styleClass = "";
    let displayDuration = 5000;

    switch (dialogType) {
      case SlidingDialogType.INFO:
        styleClass = "info-type";
        displayDuration = 10000;
        break;
      case SlidingDialogType.ERROR:
        styleClass = "error-type";
        displayDuration = 7200000;
        break;
      case SlidingDialogType.SUCCESS:
        styleClass = "success-type";
        displayDuration = 10000;
        break;
    }

    this.snackBar.open(message, "OK", {
      duration: duration ? duration : displayDuration,
      verticalPosition: 'top',
      panelClass: ['snackbar-custom-class', styleClass]
    });
  }

}

export enum SlidingDialogType {
  INFO, ERROR, SUCCESS
}
