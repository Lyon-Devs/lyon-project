import { Injectable } from '@angular/core';

import { ActingBranch } from '@models/acting-branch.model';
import { CrudService } from '@services/crud-service.abstract';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class ActingBranchService extends CrudService<ActingBranch> {
  private urlActing = '';
  constructor(protected http: HttpClient) {
    super(http, 'acting/branch');
    this.urlActing = env.apiUrl + 'acting/branch/all';
  }

  public all(): Observable<ActingBranch[]> {
    return this.http.get<ActingBranch[]>(`${this.urlActing}`);
  }
}
