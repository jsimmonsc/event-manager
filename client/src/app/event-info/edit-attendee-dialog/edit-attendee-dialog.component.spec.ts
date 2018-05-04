import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendeeDialogComponent } from './edit-attendee-dialog.component';

describe('EditAttendeeDialogComponent', () => {
  let component: EditAttendeeDialogComponent;
  let fixture: ComponentFixture<EditAttendeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAttendeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAttendeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
