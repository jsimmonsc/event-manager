import {Component} from '@angular/core';
import {Attendee} from "../shared/models/attendee.model";
import {WarningDialogComponent} from "./warning-dialog/warning-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material";
import {Student} from "../shared/models/student.model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../shared/services/event.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {

  private id: string;
  student: Student;

  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  searchForStudent(studentNumber: string) {
    this.student = null;


  }

}
