import {inject, TestBed} from '@angular/core/testing';

import {CanActivateAdminPanelGuard} from './can-activate-admin-panel.guard';

describe('CanActivateAdminPanelGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAdminPanelGuard]
    });
  });

  it('should ...', inject([CanActivateAdminPanelGuard], (guard: CanActivateAdminPanelGuard) => {
    expect(guard).toBeTruthy();
  }));
});
