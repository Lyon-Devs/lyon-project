import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crud } from '../crud.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { TypeServices as Type } from '@models/type-service';
import { Paginate } from '@models/paginate.model';

@Injectable({
  providedIn: 'root'
})
export class TypeServices implements Crud<Type> {

  private static url = `${environment.apiUrl}type/service`;
  constructor(private http: HttpClient) { }
  public list(page: number, perPage: number): Observable<Paginate<Type>> {
    return this.http.get<Paginate<Type>>(`${TypeServices.url}?page=${page}&per_page=${perPage}`);
  }
  public delete(data: Type): Observable<Type> {
    return this.http.delete<Type>(`${TypeServices.url}/${data.id}`);
  }
  public update(data: any): Observable<Type> {
    return this.http.put<Type>(`${TypeServices.url}/${data.id}`, data);
  }
  public create(data: any): Observable<Type> {
    return this.http.post<Type>(`${TypeServices.url}`, data);
  }
}
