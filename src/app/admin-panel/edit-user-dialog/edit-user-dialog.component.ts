import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../../shared/services/auth/auth.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

  public changedUser: User;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public authService: AuthService) {
  }

  saveUser(): void {
    // TODO: Save user and return to component
  }

  openDeleteWarningDialog(): void {
    // TODO: Open Dialog to warn about deletion, then return to component
  }
}
