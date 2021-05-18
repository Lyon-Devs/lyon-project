import { Injectable } from '@angular/core';
import { CrudService } from '@services/crud-service.abstract';
import { Home } from '@models/home.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  protected url = `${environment.apiUrl}home`;
  constructor(public http: HttpClient) {
  }
  public all(): Observable<Home> {
    return this.http.get<Home>(`${this.url}/all`);
  }

}
