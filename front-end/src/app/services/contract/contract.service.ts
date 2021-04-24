import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract } from '@models/contract.model';
import { CrudService } from '@services/crud-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends CrudService<Contract> {

  constructor(public http: HttpClient) {
    super(http, 'contract');
  }
}
