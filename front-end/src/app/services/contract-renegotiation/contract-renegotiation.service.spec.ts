import { TestBed } from '@angular/core/testing';

import { ContractRenegotiationService } from './contract-renegotiation.service';

describe('ContractRenegotiationService', () => {
  let service: ContractRenegotiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractRenegotiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
