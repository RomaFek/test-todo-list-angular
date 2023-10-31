import { TestBed } from '@angular/core/testing';

import { UniqCollectService } from './uniq-collect.service';

describe('UniqCollectService', () => {
  let service: UniqCollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqCollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
