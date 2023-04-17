import { TestBed } from '@angular/core/testing';

import { UserNotesService } from './user-notes.service';

describe('UserNotesService', () => {
  let service: UserNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
