import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ContractRenegotiation } from '@models/contract-renegotiation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractRenegotiationService extends CrudService<ContractRenegotiation> {

  constructor(public http: HttpClient) {
    super(http, 'contract/renegotiation');
  }
}
