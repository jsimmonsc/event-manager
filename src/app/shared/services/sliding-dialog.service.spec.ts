import { TestBed, inject } from '@angular/core/testing';

import { SlidingDialogService } from './sliding-dialog.service';

describe('SlidingDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlidingDialogService]
    });
  });

  it('should be created', inject([SlidingDialogService], (service: SlidingDialogService) => {
    expect(service).toBeTruthy();
  }));
});
