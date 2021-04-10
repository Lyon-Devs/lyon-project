import { TestBed } from '@angular/core/testing';

import { TypeServices } from './type-service.service';

describe('TypServiceService', () => {
  let service: TypeServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
