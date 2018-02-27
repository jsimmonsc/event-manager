import {inject, TestBed} from '@angular/core/testing';

import {CanActivateCheckInGuard} from './can-activate-check-in.guard';

describe('CanActivateCheckInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateCheckInGuard]
    });
  });

  it('should ...', inject([CanActivateCheckInGuard], (guard: CanActivateCheckInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
