import { Injectable } from '@angular/core';
import { Crud } from '@services/crud.interface';
import { ActingBranch } from '@models/acting-branch.model';
import { CrudService } from '@services/crud-service.abstract';
import { Paginate } from '@models/paginate.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActingBranchService extends CrudService<ActingBranch> {
  constructor(protected http: HttpClient) {
    super(http, 'acting/branch');
  }
}
