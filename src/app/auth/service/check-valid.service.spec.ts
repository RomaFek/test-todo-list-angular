import { TestBed } from '@angular/core/testing';

import { CheckValidService } from './check-valid.service';

describe('CheckValidService', () => {
  let service: CheckValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
