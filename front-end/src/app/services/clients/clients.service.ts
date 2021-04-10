import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { Clients } from '@models/clients.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends CrudService<Clients>{

  constructor(public http: HttpClient) {
    super(http, 'client');
  }
}
