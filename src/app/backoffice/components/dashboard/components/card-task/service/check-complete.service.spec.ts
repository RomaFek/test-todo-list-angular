import { TestBed } from '@angular/core/testing';

import { CheckCompleteService } from './check-complete.service';

describe('CheckCompleteService', () => {
  let service: CheckCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
