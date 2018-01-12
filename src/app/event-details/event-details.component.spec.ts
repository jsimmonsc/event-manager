import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatInputModule, MatNativeDateModule,
  MatStepperModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatTableModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
