import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Paginate } from '@models/paginate.model';
import { TypeServices as Type } from '@models/type-service';

import { ConfirmComponent } from '@components/confirm/confirm.component';

import { TypeServices } from '@services/type-service/type-service.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { PaginateService } from '../../../services/paginate/paginate.service';
import { CrudPage } from '../../crud-page.interface';

@Component({
  selector: 'app-type-service',
  templateUrl: './type-service.component.html',
  styleUrls: ['./type-service.component.scss']
})
export class TypeServiceComponent implements OnInit, CrudPage<Type> {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public paginateItems: Paginate<Type>;
  public displayedColumns: string[] = ['unity_business', 'name', 'email_group', 'created_at', 'updated_at', 'actions'];
  public pageEvent: PageEvent = new PageEvent();
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private typeService: TypeServices,
    private paginateService: PaginateService<Type>,
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  public handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  public create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.handlePageEvent();
      }
    });
  }

  public destroy(type: Type): void {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão usuário`,
        body: `Confirmar exclusão do tipo de serviço <b>${type.name}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.typeService.delete(type).subscribe(resUser => {
          this.paginateItems = this.paginateService.removeItem(type, this.paginateItems);
          this.snackBar.open(`Tipo de serviço ${type.name} removido!`);
        });
      }
    });

  }
  public update(type: Type): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: type
    });

    dialogRef.afterClosed().subscribe(event => {
      this.handlePageEvent();
    });
  }
  public getPage(page: number = 0, perPage: number = 10): void {
    this.typeService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }
}
