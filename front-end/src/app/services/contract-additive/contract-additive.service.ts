import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { ContractAdditive } from '@models/contract-additive.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractAdditiveService extends CrudService<ContractAdditive> {

  constructor(public http: HttpClient) {
    super(http, 'contract/additive');
  }
}
