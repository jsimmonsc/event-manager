import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from "../shared/services/event/event.service";
import {Event} from "../shared/models/event.model";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Attendee} from "../shared/models/attendee.model";
import {EditAttendeeDialogComponent} from "./edit-attendee-dialog/edit-attendee-dialog.component";
import {FormGroup} from "@angular/forms";
import {AddAttendeeDialogComponent} from "./add-attendee-dialog/add-attendee-dialog.component";
import {PapaParseService} from "ngx-papaparse";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  addStudentForm: FormGroup;
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
              private changeDetectorRef: ChangeDetectorRef,
              private csvExporter: PapaParseService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.eventService.getEvent(this.id).subscribe(event => {
      this.event = event;
      event.attendees = event.attendees ? event.attendees : [];

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

  editEvent() {
    this.router.navigateByUrl('/edit/' + this.id);
  }

  editAttendee(attendee: Attendee): void {
    const editDialogRef = this.dialog.open(EditAttendeeDialogComponent, {data: {attendee: attendee, eventID: this.id}});

    editDialogRef.afterClosed().subscribe((value: Event) => {
      if (value) {
        this.dataSource = new MatTableDataSource<Attendee>(value.attendees);
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  applyFilter(value: string): void {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  addAttendee(): void {
    const addDialogRef = this.dialog.open(AddAttendeeDialogComponent, {data: {eventID: this.id, }, width: '35%', height: '55%'});
    addDialogRef.afterClosed().subscribe((value: Event) => {
      if (value) {
        this.dataSource = new MatTableDataSource<Attendee>(value.attendees);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  exportToCSV() {
    const csvData = new Blob([this.csvExporter.unparse(this.event.attendees)], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(csvData, this.event.name + ".csv");
    } else {
      // In FF link must be added to DOM to be clicked
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(csvData);
      link.setAttribute('download', this.event.name + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  roundMoney(num: number): string {
    return parseFloat("" + Math.round(num * 100) / 100).toFixed(2);
  }
}

