import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ProposalFiles } from '@models/proposal-files.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalFilesService extends CrudService<ProposalFiles> {

  private proposalId: number;
  constructor(public http: HttpClient) {
    super(http, 'proposal');
  }

  public setContract(proposalId: number): void {
    this.proposalId = proposalId;
    this.url = `${environment.apiUrl}proposal/${proposalId}/files`;
  }
}

