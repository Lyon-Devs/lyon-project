import { Inject, Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ContractAdditive } from '@models/contract-additive.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginate } from '../../models/paginate.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractAdditiveService extends CrudService<ContractAdditive> {

  private contractId: number;
  constructor(public http: HttpClient) {
    super(http, `contract/`);
  }
  public setContract(contractId: number): void {
    this.contractId = contractId;
    this.url = `${environment.apiUrl}contract/${contractId}/additive`;
  }
}
