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
  displayedColumns: string[];
  pageEvent: PageEvent;

  handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        // this.handlePageEvent();
      }
    });
  }
  destroy(item: Proposal): void {
    throw new Error('Method not implemented.');
  }
  update(item: Proposal): void {
    throw new Error('Method not implemented.');
  }
  getPage(page: number, perPage: number): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
