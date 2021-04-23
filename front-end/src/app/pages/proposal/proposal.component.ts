import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paginate } from '@models/paginate.model';
import { Proposal } from '@models/proposal.model';
import { CrudPage } from '@pages/crud-page.interface';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ProposalService } from '../../services/proposal/proposal.service';
import { PaginateService } from '@services/paginate/paginate.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit, CrudPage<Proposal> {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private proposalService: ProposalService,
    private paginateService: PaginateService<Proposal>,
  ) { }
  paginateItems: Paginate<Proposal>;
  displayedColumns: string[] = [
    'cod_lyon', 'client_id', 'acting_branch_id',
    'status', 'deadline_date_confirme',
    'summary_scope', 'months_exec', 'actions'
  ];
  pageEvent: PageEvent;

  handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '900px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        // this.handlePageEvent();
      }
    });
  }
  destroy(item: Proposal): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão proposta`,
        body: `Confirmar exclusão da proposta <b>${item.cod_lyon}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.proposalService.delete(item).subscribe(resUser => {
          this.paginateItems = this.paginateService.removeItem(item, this.paginateItems);
          console.log('item', item)
          this.snackBar.open(`Proposta ${item.cod_lyon} removida!`);
        });
      }
    });
  }
  update(item: Proposal): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '900px',
      data: item
    });

    dialogRef.afterClosed().subscribe(event => {
      this.handlePageEvent();
    });
  }
  getPage(page: number = 0, perPage: number = 10): void {
    this.proposalService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  getStatus(status: string): string {

    const translateStatus = {
      committee_1: 'Comitê 1',
      committee_2: 'Comitê 1',
      lost: 'Perdido',
      draft: 'Rascunho',
      canceled: 'Cancelado',
      finished: 'Finalizado',
      winner: 'Ganho'

    };

    return translateStatus[status];
  }

  ngOnInit(): void {
    this.getPage();
  }

}
