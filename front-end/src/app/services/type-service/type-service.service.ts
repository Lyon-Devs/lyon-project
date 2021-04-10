import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TypeServices as Type } from '@models/type-service';

import { CrudService } from '@services/crud-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class TypeServices extends CrudService<Type> {
  constructor(public http: HttpClient) {
    super(http, 'type/service');
  }
}
