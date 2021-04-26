import { TestBed } from '@angular/core/testing';

import { ContractAdditiveService } from './contract-additive.service';

describe('ContractAdditiveService', () => {
  let service: ContractAdditiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractAdditiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
