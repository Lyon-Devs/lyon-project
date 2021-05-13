import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proposal } from '@models/proposal.model';
import { ProposalRevisionService } from '@services/proposal-revision/proposal-revision.service';
import { ProposalRevision } from '@models/proposal-revision.model';
import { CrudPage } from '@pages/crud-page.interface';
import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '@models/paginate.model';
import { PaginateService } from '@services/paginate/paginate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateProposalRevisionComponent } from '../../../components/create-proposal-revision/create-proposal-revision.component';
import { ConfirmComponent } from '@components/confirm/confirm.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, CrudPage<ProposalRevision> {
  public subtitle: string;
  public proposal: Proposal;
  public paginateItems: Paginate<ProposalRevision>;
  public displayedColumns: string[] = [
    'medium_histogram', 'number_revision', 'global_price', 'gross_margin',
    'bdi', 'taxes', 'charge', 'financial_taxis', 'type_price', 'data_committee', 'actions'
  ];
  public pageEvent: PageEvent;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private paginateService: PaginateService<ProposalRevision>,
    private proposalRevisionService: ProposalRevisionService

  ) { }
  handlePageEvent(event: PageEvent): void {
    throw new Error('Method not implemented.');
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateProposalRevisionComponent, {
      width: '450px', data: {
        proposal_id: this.proposal.id
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.getPage();
      }
    });
  }
  destroy(item: ProposalRevision): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão revisão`,
        body: `Confirmar exclusão da revisão <b>${item.number_revision}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.proposalRevisionService.delete(item).subscribe(resUser => {
          this.paginateItems = this.paginateService.removeItem(item, this.paginateItems);
          console.log('item', item)
          this.snackBar.open(`Revisão ${item.number_revision} removida!`);
        });
      }
    });
  }
  update(item: ProposalRevision): void {
    const dialogRef = this.dialog.open(CreateProposalRevisionComponent, {
      width: '450px', data: item
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.getPage();
      }
    });
  }
  public getPage(page: number = 0, perPage: number = 10): void {
    this.proposalRevisionService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  public parseTypePrice(type: string): string {
    const parseTypes = {
      global: 'Global',
      unity: 'Unidade',
      menu: 'Cardápio'
    };
    return parseTypes[type];
  }
  ngOnInit(): void {
    this.route.data.subscribe(params => {
      this.proposal = params.ProposalResolve;
      this.subtitle = `gerênciamento da proposta ${this.proposal.cod_lyon}`;
    });
    this.proposalRevisionService.setContract(this.proposal.id);
    this.getPage();

  }

}
