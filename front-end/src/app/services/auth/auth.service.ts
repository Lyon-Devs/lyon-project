import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public authUser(user: string, password: string): any {
    this.http.post<any>(`${environment.apiUrl}oauth/token`, {
      grant_type: 'password',
      client_id: environment.auth.client_id,
      client_secret: environment.auth.client_secret,
      username: user,
      password,
      scope: environment.auth.scope
    }).subscribe(res => console.log(res));
  }
}
