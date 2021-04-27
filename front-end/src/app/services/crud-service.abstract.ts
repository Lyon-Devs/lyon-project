import { Observable } from 'rxjs';
import { Crud } from './crud.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Paginate } from '../models/paginate.model';

export abstract class CrudService<t> implements Crud<t> {

    constructor(protected http: HttpClient, public uri: string) { }

    protected url = `${environment.apiUrl}${this.uri}`;
    public list(page: number, perPage: number): Observable<Paginate<t>> {
        return this.http.get<Paginate<t>>(`${this.url}?page=${page}&per_page=${perPage}`);
    }
    public delete(data: any): Observable<t> {
        return this.http.delete<t>(`${this.url}/${data.id}`);
    }
    public update(data: any): Observable<t> {
        return this.http.put<t>(`${this.url}/${data.id}`, data);
    }
    public create(data: any): Observable<t> {
        return this.http.post<t>(`${this.url}`, data);
    }
    public all(): Observable<t[]> {
        return this.http.get<t[]>(`${this.url}/all`);
    }
    public show(id: number): Observable<t> {
        return this.http.get<t>(`${this.url}/${id}`);
    }
}
