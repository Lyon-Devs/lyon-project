import { Injectable } from '@angular/core';
import { Paginate } from '@models/paginate.model';


@Injectable({
  providedIn: 'root'
})
export class PaginateService<t> {

  constructor() { }

  // Remove a item of paginate
  public removeItem(item: any, paginate: Paginate<t>, prop: string = 'id'): Paginate<t> {
    const removedItem = paginate.data.filter(el => el[prop] !== item[prop]);
    if (removedItem.length) {
      paginate.data = removedItem;
      paginate.total--;
    }else {
      paginate.data = [];
      paginate.total = 0;
    }
    return paginate;
  }
}
