import { Component, OnInit, Input } from '@angular/core';
import { CrudPage } from '@pages/crud-page.interface';
import { ContractRenegotiation } from '@models/contract-renegotiation.model';
import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '@models/paginate.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PaginateService } from '@services/paginate/paginate.service';
import { ContractRenegotiationService } from '../../../services/contract-renegotiation/contract-renegotiation.service';
import { Contract } from '@models/contract.model';
import { Subscription } from 'rxjs';
import { CreateContractRenegotiationComponent } from '@components/create-contract-renegotiation/create-contract-renegotiation.component';

@Component({
  selector: 'app-contract-renegotiation',
  templateUrl: './contract-renegotiation.component.html',
  styleUrls: ['./contract-renegotiation.component.scss']
})
export class ContractRenegotiationComponent implements OnInit, CrudPage<ContractRenegotiation> {


  // readjustment_base: '';

  public paginateItems: Paginate<ContractRenegotiation>;
  public displayedColumns: string[] = [
    'number_renegotiation', 'year', 'purchasing_period',
    'readjustment_base', 'required', 'approved', 'actions'
  ];
  public pageEvent: PageEvent;
  private subscriptItem: Subscription;
  @Input() public contract: Contract;
  constructor(
    private contractRenegotiationService: ContractRenegotiationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private paginateService: PaginateService<ContractRenegotiation>,
  ) { }

  public readjustmentBase(status: string): string {
    const castReadjust = {
      parametric_formula: 'Fórmula paramétrica',
      financial_index: 'índice financeiro'
    };
    return castReadjust[status];
  }
  handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateContractRenegotiationComponent, {
      width: '500px',
      disableClose: true,
      data: {
        contract_id: this.contract.id
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.handlePageEvent();
      }
    });
  }
  destroy(item: ContractRenegotiation): void {
    this.subscriptItem.unsubscribe();
  }
  update(item: ContractRenegotiation): void {
    const dialogRef = this.dialog.open(CreateContractRenegotiationComponent, {
      width: '500px',
      disableClose: true,
      data: item
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.handlePageEvent();
      }
    });
  }
  public getPage(page: number = 0, perPage: number = 5): void {
    this.subscriptItem = this.contractRenegotiationService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  ngOnInit(): void {
    this.contractRenegotiationService.setContract(this.contract.id);
    this.getPage();
  }

}
