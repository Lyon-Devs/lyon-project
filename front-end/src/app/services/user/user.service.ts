import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginate } from '@models/paginate.model';
import { User } from '@models/users.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public list(page: number = 0, perPage: number = 20): Observable<Paginate<User>> {
    return this.http.get<Paginate<User>>(`${environment.apiUrl}users?page=${page}&per_page=${perPage}`);
  }

  public delete(user: User): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}users/${user.id}`);
  }
}
