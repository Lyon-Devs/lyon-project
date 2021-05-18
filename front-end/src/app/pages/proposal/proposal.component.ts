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
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterQuery } from '../../models/filter-query.model';

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
  public paginateItems: Paginate<Proposal>;
  public displayedColumns: string[] = [
    'cod_lyon', 'type_service_id',
    'status', 'deadline_date_confirme', 'date_delivery_technique_proposal',
    'date_delivery_comercial_proposal', 'months_exec', 'actions'
  ];
  public pageEvent: PageEvent;
  public filter: FilterQuery[] = [];
  public codLyonFc: FormControl;
  public statusFc: FormControl;

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
        this.handlePageEvent();
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
  getPage(page: number = 0, perPage: number = 10, filter: FilterQuery[] = this.filter): void {
    this.proposalService.list(page, perPage, filter).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  getStatus(status: string): string {

    const translateStatus = {
      committee_1: 'Comitê 1',
      committee_2: 'Comitê 2',
      lost: 'Perdido',
      draft: 'Rascunho',
      canceled: 'Cancelado',
      winner: 'Ganho'

    };

    return translateStatus[status];
  }

  ngOnInit(): void {
    this.codLyonFc = new FormControl();
    this.statusFc = new FormControl(['committee_1', 'committee_2', 'draft']);
    this.codLyonFc.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe(res => {
        this.addFilter('cod_lyon', res);
        this.getPage(0, 10, this.filter);
      });

    this.statusFc.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      )
      .subscribe(res => {
        this.addFilter('status', res);
        this.getPage(0, 10, this.filter);
      });
    this.addFilter('status', this.statusFc.value);
    this.getPage(0, 10, this.filter);
  }
  private addFilter(filter: string, value: any): void {
    if (value === undefined || value === null || value === '') {
      this.filter = this.filter.filter(filterEl => filterEl.filter !== filter);
    } else if (this.filter.some(filterEl => filterEl.filter === filter)) {
      this.filter.map(filterEl => {
        if (filterEl.filter === filter) {
          filterEl.value = value;
        }
        return filterEl;
      });
    } else {
      this.filter.push({
        filter,
        value
      });
    }
  }

}
