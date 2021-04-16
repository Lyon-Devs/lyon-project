import { Component, OnInit } from '@angular/core';
import { CrudPage } from '@pages/crud-page.interface';
import { Buyer } from '@models/buyer.model';
import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '@models/paginate.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginateService } from '@services/paginate/paginate.service';
import { BuyerService } from '@services/buyer/buyer.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ConfirmComponent } from '@components/confirm/confirm.component';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit, CrudPage<Buyer> {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private actingBranchService: BuyerService,
    private paginateService: PaginateService<Buyer>,
  ) { }
  public paginateItems: Paginate<Buyer>;
  public displayedColumns: string[] = ['name', 'client', 'created_at', 'updated_at', 'actions'];
  pageEvent: PageEvent;
  handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.handlePageEvent();
      }
    });
  }
  destroy(item: Buyer): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão comprador`,
        body: `Confirmar exclusão do comprador <b>${item.name}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.actingBranchService.delete(item).subscribe(resUser => {
          this.paginateItems = this.paginateService.removeItem(item, this.paginateItems);
          this.snackBar.open(`Tipo de serviço ${item.name} removido!`);
        });
      }
    });
  }
  update(item: Buyer): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(event => {
      this.handlePageEvent();
    });
  }
  getPage(page: number = 0, perPage: number = 10): void {
    this.actingBranchService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  ngOnInit(): void {
    this.getPage();
  }

}
