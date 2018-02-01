import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class SlidingDialogService {

  constructor(public snackBar: MatSnackBar) { }

  displayNotification(message: string) {

    this.snackBar.open(message, "OK", {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar-custom-class'],
    });



  }

}
