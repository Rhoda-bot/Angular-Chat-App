import { TestBed } from '@angular/core/testing';

import { GaurdChatGuard } from './gaurd-chat.guard';

describe('GaurdChatGuard', () => {
  let guard: GaurdChatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GaurdChatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
