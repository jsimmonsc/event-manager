import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateEventGuard } from './can-activate-event.guard';

describe('CanActivateEventGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateEventGuard]
    });
  });

  it('should ...', inject([CanActivateEventGuard], (guard: CanActivateEventGuard) => {
    expect(guard).toBeTruthy();
  }));
});
