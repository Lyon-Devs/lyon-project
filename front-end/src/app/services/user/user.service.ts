import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/users.model';
import { CrudService } from '@services/crud-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(public http: HttpClient) {
    super(http, 'users');
   }
}
