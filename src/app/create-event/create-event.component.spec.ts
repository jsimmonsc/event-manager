import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatInputModule, MatNativeDateModule,
  MatStepperModule, MatTableModule, MatTooltipModule
} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventComponent ],
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
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
