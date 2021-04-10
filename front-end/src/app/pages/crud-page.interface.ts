import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '../models/paginate.model';

export interface CrudPage<t> {
    paginateItems: Paginate<t>;
    displayedColumns: string[];
    pageEvent: PageEvent;

    handlePageEvent(event: PageEvent): void;
    create(): void;
    destroy(item: t): void;
    update(item: t): void;
    getPage(page: number, perPage: number): void;

}
