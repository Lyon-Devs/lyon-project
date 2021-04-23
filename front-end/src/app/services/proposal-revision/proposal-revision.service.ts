import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ProposalRevision } from '@models/proposal-revision.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProposalRevisionService extends CrudService<ProposalRevision> {
  constructor(protected http: HttpClient) {
    super(http, 'proposal/revision');
  }
}
