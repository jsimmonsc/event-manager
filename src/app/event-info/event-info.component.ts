import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from "../shared/services/event.service";
import {Event} from "../shared/models/event.model";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Attendee} from "../shared/models/attendee.model";
import {EditAttendeeDialogComponent} from "./edit-attendee-dialog/edit-attendee-dialog.component";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  id: string;
  event: Event;
  private sub: any;
  displayedColumns = ['ticket', 'name', 'student_number', 'grade_level', 'guest', 'timestamp', 'comment', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Attendee>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.eventService.getEvent(this.id).subscribe(event => {
      this.event = event;

      this.dataSource = new MatTableDataSource<Attendee>(this.event.attendees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToCheckIn() {
    this.router.navigateByUrl('/checkin/' + this.id);
  }

  goToSellTickets() {
    this.router.navigateByUrl('/sell/' + this.id);
  }

  editAttendee(attendee: Attendee): void {
    const editDialogRef = this.dialog.open(EditAttendeeDialogComponent, { data: { attendee: attendee, eventID: this.id } });

    editDialogRef.afterClosed().subscribe((value: Event) => {
      if (value) {
        this.dataSource = new MatTableDataSource<Attendee>(value.attendees);
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
