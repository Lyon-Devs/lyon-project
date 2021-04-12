import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { Proposal } from '@models/proposal.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProposalService extends CrudService<Proposal> {

  constructor(protected http: HttpClient) {
    super(http, 'proposal');
  }
}
