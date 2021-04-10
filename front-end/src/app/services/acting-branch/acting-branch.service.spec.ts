import { TestBed } from '@angular/core/testing';

import { ActingBranchService } from './acting-branch.service';

describe('ActingBranchService', () => {
  let service: ActingBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActingBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
