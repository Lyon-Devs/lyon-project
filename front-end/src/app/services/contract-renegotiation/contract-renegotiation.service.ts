import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ContractRenegotiation } from '@models/contract-renegotiation.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractRenegotiationService extends CrudService<ContractRenegotiation> {

  private contractId: number;
  constructor(public http: HttpClient) {
    super(http, 'contract/renegotiation');
  }

  public setContract(contractId: number): void {
    this.contractId = contractId;
    this.url = `${environment.apiUrl}contract/${contractId}/renegotiation`;
  }
}
