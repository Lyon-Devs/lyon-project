import { Component, OnInit } from '@angular/core';
import { CrudPage } from '../crud-page.interface';
import { Contract } from '@models/contract.model';
import { PageEvent } from '@angular/material/paginator';
import { Paginate } from '@models/paginate.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractService } from '../../services/contract/contract.service';
import { PaginateService } from '@services/paginate/paginate.service';
import { CreateContractComponent } from '@components/create-contract/create-contract.component';
import { ConfirmComponent } from '@components/confirm/confirm.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit, CrudPage<Contract> {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private contractService: ContractService,
    private paginateService: PaginateService<Contract>,
  ) { }
  public paginateItems: Paginate<Contract>;
  public displayedColumns: string[] = [
    'proposal', 'center_of_cost', 'contract_number',
    'purchase_order', 'manager_lyon',
    'manager_client', 'date_start', 'date_end',
    'readjustment_base_date', 'actions'
  ];
  public pageEvent: PageEvent;
  handlePageEvent(event: PageEvent  = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateContractComponent, {
      width: '500px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.handlePageEvent();
      }
    });
  }
  destroy(item: Contract): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão contrato`,
        body: `Confirmar exclusão do contrato <b>${item.contract_number}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.contractService.delete(item).subscribe(resUser => {
          this.paginateItems = this.paginateService.removeItem(item, this.paginateItems);
          this.snackBar.open(`Proposta ${item.contract_number} removida!`);
        });
      }
    });
  }
  update(item: Contract): void {
    const dialogRef = this.dialog.open(CreateContractComponent, {
      width: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe(event => {
      this.handlePageEvent();
    });
  }
  public getPage(page: number = 0, perPage: number = 10): void {
    this.contractService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  ngOnInit(): void {
    this.getPage();
  }

}
