import {Component} from '@angular/core';
import {DeleteUserWarningDialogComponent} from "../delete-user-warning-dialog/delete-user-warning-dialog.component";
import {AuthService} from "../../shared/services/auth/auth.service";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<DeleteUserWarningDialogComponent>) {
  }

  addUser(): void {

  }
}
