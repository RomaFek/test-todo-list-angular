import { TestBed } from '@angular/core/testing';

import { SeparationTasksService } from './separation-tasks.service';

describe('SeparationTasksService', () => {
  let service: SeparationTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeparationTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
