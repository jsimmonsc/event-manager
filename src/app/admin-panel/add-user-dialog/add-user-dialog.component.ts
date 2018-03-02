import {Component} from '@angular/core';
import {DeleteUserWarningDialogComponent} from "../delete-user-warning-dialog/delete-user-warning-dialog.component";
import {AuthService} from "../../shared/services/auth/auth.service";
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/user.model";
import {SlidingDialogService, SlidingDialogType} from "../../shared/services/sliding-dialog.service";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {

  public roles = [
    {value: "admin", viewValue: "Admin"},
    {value: "checker", viewValue: "Checker"},
    {value: "seller", viewValue: "Seller"}
  ];
  public userForm: FormGroup;

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<DeleteUserWarningDialogComponent>,
              private fb: FormBuilder,
              private errDialog: SlidingDialogService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      this.authService.findAllUsers().subscribe((users: User[]) => {
        if (!users.find(x => x.email === this.userForm.get('email').value.toLowerCase())) {
          this.authService.createUser({
            email: this.userForm.get('email').value, role: this.userForm.get('role').value
            }).subscribe((value: User) => {
            this.dialogRef.close(value);
          }, err => {
            this.errDialog.displayNotification(err.message, SlidingDialogType.ERROR);
          });
        } else {
          this.errDialog.displayNotification("ERROR: This user already exists!", SlidingDialogType.ERROR);
        }
      });
    }
  }
}
