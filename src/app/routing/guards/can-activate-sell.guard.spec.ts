import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateSellGuard } from './can-activate-sell.guard';

describe('CanActivateSellGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateSellGuard]
    });
  });

  it('should ...', inject([CanActivateSellGuard], (guard: CanActivateSellGuard) => {
    expect(guard).toBeTruthy();
  }));
});
