import { TestBed } from '@angular/core/testing';

import { ProposalFilesService } from './proposal-files.service';

describe('ProposalFilesService', () => {
  let service: ProposalFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposalFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
