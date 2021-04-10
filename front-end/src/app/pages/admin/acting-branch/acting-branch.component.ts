import { Component, OnInit } from '@angular/core';
import { CrudPage } from '@pages/crud-page.interface';
import { ActingBranch } from '@models/acting-branch.model';
import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '@models/paginate.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActingBranchService } from '@services/acting-branch/acting-branch.service';
import { PaginateService } from '@services/paginate/paginate.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ConfirmComponent } from '@components/confirm/confirm.component';

@Component({
  selector: 'app-acting-branch',
  templateUrl: './acting-branch.component.html',
  styleUrls: ['./acting-branch.component.scss']
})
export class ActingBranchComponent implements OnInit, CrudPage<ActingBranch> {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private actingBranchService: ActingBranchService,
    private paginateService: PaginateService<ActingBranch>,
  ) { }
  public paginateItems: Paginate<ActingBranch>;
  public displayedColumns: string[] = ['name', 'created_at', 'updated_at', 'actions'];
  public pageEvent: PageEvent = new PageEvent();
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
  public destroy(item: ActingBranch): void {
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
  public update(item: ActingBranch): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(event => {
      this.handlePageEvent();
    });
  }
  public getPage(page: number = 0, perPage: number = 10): void {
    this.actingBranchService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }
  ngOnInit(): void {
    this.getPage();
  }

}
