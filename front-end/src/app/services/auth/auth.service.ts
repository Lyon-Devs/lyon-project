import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models/users.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  public authUser(user: string, password: string): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}oauth/token`, {
      grant_type: 'password',
      client_id: environment.auth.client_id,
      client_secret: environment.auth.client_secret,
      username: user,
      password,
      scope: environment.auth.scope
    }).pipe(map(resUser => {
      sessionStorage.setItem('lyon_0', JSON.stringify(resUser));
      this.checkSession().subscribe();
      return resUser;
    }));
  }
  public registerUser(newUser): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}register`, newUser);
  }
  public updateUser(newUser): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}users/${newUser.id}`, newUser);
  }

  public checkSession(): Observable<User> {
    const sessionToken = sessionStorage.getItem('lyon_0');
    if (sessionToken) {
      return this.http.get<User>(`${environment.apiUrl}user`)
        .pipe(map(user => {
          this.userBehaviorSubject.next(user);
          sessionStorage.setItem('user', JSON.stringify(user));
          return user;
        }),
          catchError(err => {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('lyon_0');
            return throwError(err);
          }));
    }
    return new Observable<User>(null);
  }

  public logout(): void {
    sessionStorage.removeItem('lyon_0');
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  public getUser(): Observable<User> {
    return this.userBehaviorSubject;
  }
}
