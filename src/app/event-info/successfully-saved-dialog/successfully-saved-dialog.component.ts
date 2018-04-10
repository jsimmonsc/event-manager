import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {EventService} from "../../shared/services/event/event.service";

@Component({
  selector: 'app-successfully-saved-dialog',
  templateUrl: './successfully-saved-dialog.component.html',
  styleUrls: ['./successfully-saved-dialog.component.scss']
})
export class SuccessfullySavedDialogComponent {

  constructor(private dialogRef: MatDialogRef<SuccessfullySavedDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private eventService: EventService,
              private matDialog: MatDialog,
              private fb: FormBuilder
  ) {}

}
