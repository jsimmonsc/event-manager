import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteUserWarningDialogComponent} from './delete-user-warning-dialog.component';

describe('DeleteUserWarningDialogComponent', () => {
  let component: DeleteUserWarningDialogComponent;
  let fixture: ComponentFixture<DeleteUserWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserWarningDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
