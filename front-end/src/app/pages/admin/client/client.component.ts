import { Component, OnInit } from '@angular/core';
import { CrudPage } from '@pages/crud-page.interface';
import { Clients } from '@models/clients.model';
import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '@models/paginate.model';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActingBranch } from '@models/acting-branch.model';
import { PaginateService } from '@services/paginate/paginate.service';
import { ClientsService } from '@services/clients/clients.service';
import { ConfirmComponent } from '@components/confirm/confirm.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, CrudPage<Clients>  {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private actingBranchService: ClientsService,
    private paginateService: PaginateService<Clients>,

  ) { }
  public paginateItems: Paginate<Clients>;
  displayedColumns: string[] = ['name', 'acting_branch', 'created_at', 'updated_at', 'actions'];
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
  destroy(item: Clients): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão usuário`,
        body: `Confirmar exclusão do tipo de serviço <b>${item.name}</b>`,
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
  update(item: Clients): void {
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
