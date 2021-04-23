import { TestBed } from '@angular/core/testing';

import { ProposalRevisionService } from './proposal-revision.service';

describe('ProposalRevisionService', () => {
  let service: ProposalRevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposalRevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
