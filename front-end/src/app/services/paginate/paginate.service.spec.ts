import { TestBed } from '@angular/core/testing';

import { PaginateService } from './paginate.service';

describe('PaginatorService', () => {
  let service: PaginateService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
