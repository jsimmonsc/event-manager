import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Event} from "../models/event.model";
import {EventService} from "../services/event/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentInfoComponent),
      multi: true
    }
  ]
})
export class StudentInfoComponent implements ControlValueAccessor, OnInit {
  @Input() student: any;
  @Input() showRequirements = true;
  @Input() event: Event;
  @Input() isGuest = false;
  onChange = (_: any) => {};

  constructor(private eventService: EventService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.eventService.getEvent(params['id']).subscribe((event: Event) => {
          this.event = event;
        });
      }
    });
  }

  writeValue(value: any) {
    this.student = value;
    this.onChange(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
