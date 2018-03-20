import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendeeDialogComponent } from './add-attendee-dialog.component';

describe('AddAttendeeDialogComponent', () => {
  let component: AddAttendeeDialogComponent;
  let fixture: ComponentFixture<AddAttendeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
