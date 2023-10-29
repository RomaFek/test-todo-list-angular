import { TestBed } from '@angular/core/testing';

import { FilteredTasksCompletedService } from './filtered-tasks-completed.service';

describe('FilteredTasksCompletedService', () => {
  let service: FilteredTasksCompletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredTasksCompletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
