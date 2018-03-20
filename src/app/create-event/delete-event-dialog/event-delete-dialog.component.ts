import {Component, Inject, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {EventService} from "../../shared/services/event/event.service";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";
import {Router} from "@angular/router";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.scss']
})
export class DeleteEventDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private slidingDialog: SlidingDialogService,
              private router: Router,
              private dialog: MatDialog
  ) {}

  openConfirmationDialog() {

    this.dialog.closeAll();
    this.dialog.open(DeleteConfirmationDialogComponent, { data: { eventID: this.data.eventID}});

  }

}
