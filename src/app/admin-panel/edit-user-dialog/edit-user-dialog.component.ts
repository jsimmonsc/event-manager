import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {AuthService} from "../../shared/services/auth/auth.service";
import {User} from "../../shared/models/user.model";
import {DeleteUserWarningDialogComponent} from "../delete-user-warning-dialog/delete-user-warning-dialog.component";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

  public changedUser: User;
  public roles = [
    {value: "admin", viewValue: "Admin"},
    {value: "checker", viewValue: "Checker"},
    {value: "seller", viewValue: "Seller"}
  ];
  public selectedRole: string;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public authService: AuthService) {

    this.changedUser = Object.assign({}, data.user);
    this.selectedRole = this.roles.find(x => x.value === this.changedUser.role).value;
  }

  saveUser(): void {
    if (this.selectedRole !== this.changedUser.role) {
      this.changedUser.role = this.selectedRole;
      this.authService.updateUser(this.changedUser).subscribe((value: User) => {
        this.dialogRef.close(value);
        return;
      }, err => {
        // TODO: Error message
        console.log(err);
      });
    }
    this.dialogRef.close();
  }

  openDeleteWarningDialog(): void {
    const deleteRef = this.dialog.open(DeleteUserWarningDialogComponent, {data: {user: this.changedUser}});
    deleteRef.afterClosed().subscribe(val => {
      this.dialogRef.close(val);
    });
  }
}
