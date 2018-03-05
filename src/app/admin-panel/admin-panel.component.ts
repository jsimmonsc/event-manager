import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AuthService} from "../shared/services/auth/auth.service";
import {User} from "../shared/models/user.model";
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {AddUserDialogComponent} from "./add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['email', 'role', 'edit'];

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
    this.authService.findAllUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  editUser(user: User): void {
    const editDialogRef = this.dialog.open(EditUserDialogComponent, {data: {user: user}});

    editDialogRef.afterClosed().subscribe((value: User) => {
      if (value) {
        this.authService.findAllUsers().subscribe(val => {
          this.dataSource = new MatTableDataSource<User>(val);
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  addUser(): void {
    const addDialogRef = this.dialog.open(AddUserDialogComponent);

    addDialogRef.afterClosed().subscribe((value: User) => {
      if (value) {
        this.authService.findAllUsers().subscribe(val => {
          this.dataSource = new MatTableDataSource<User>(val);
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }
}
