import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buyer } from '@models/buyer.model';
import { CrudService } from '@services/crud-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class BuyerService extends CrudService<Buyer> {

  constructor(public http: HttpClient) {
    super(http, 'buyer');
   }
}
