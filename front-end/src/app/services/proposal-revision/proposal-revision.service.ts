import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ProposalRevision } from '@models/proposal-revision.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProposalRevisionService extends CrudService<ProposalRevision> {
  private proposalId: number;
  constructor(protected http: HttpClient) {
    super(http, 'proposal/revision');
  }

  public setContract(proposalId: number): void {
    this.proposalId = proposalId;
    this.url = `${environment.apiUrl}proposal/${proposalId}/revision`;
  }
}
