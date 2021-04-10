import { Observable } from 'rxjs';
import { Paginate } from '../models/paginate.model';

export interface Crud<t> {
    list(page: number, perPage: number): Observable<Paginate<t>>;
    delete(data: t): Observable<t>;
    update(data: any): Observable<t>;
    create(data: any): Observable<t>;
}
