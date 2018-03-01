import {Component, Inject} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-delete-user-warning-dialog',
  templateUrl: './delete-user-warning-dialog.component.html',
  styleUrls: ['./delete-user-warning-dialog.component.scss']
})
export class DeleteUserWarningDialogComponent {

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<DeleteUserWarningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  deleteUser(): void {
    this.authService.deleteUser(this.data.user).subscribe(value => {
      this.dialogRef.close(value);
    });
  }
}
