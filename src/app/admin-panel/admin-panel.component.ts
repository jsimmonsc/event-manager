import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {AuthService} from "../shared/services/auth/auth.service";
import {User} from "../shared/models/user.model";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['email', 'role', 'edit'];

  constructor(private authService: AuthService) {
    this.authService.findAllUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

}
