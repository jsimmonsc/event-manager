import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteGuestDialogComponent} from './delete-guest-dialog.component';

describe('DeleteGuestDialogComponent', () => {
  let component: DeleteGuestDialogComponent;
  let fixture: ComponentFixture<DeleteGuestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGuestDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGuestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
