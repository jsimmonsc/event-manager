import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullySavedDialogComponent } from './successfully-saved-dialog.component';

describe('SuccessfullySavedDialogComponent', () => {
  let component: SuccessfullySavedDialogComponent;
  let fixture: ComponentFixture<SuccessfullySavedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullySavedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullySavedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
