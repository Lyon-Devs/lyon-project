import { Component, OnInit, Input, InjectionToken, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractAdditive } from '@models/contract-additive.model';
import { Contract } from '@models/contract.model';
import { Paginate } from '@models/paginate.model';
import { CrudPage } from '@pages/crud-page.interface';
import { PaginateService } from '@services/paginate/paginate.service';
import { ContractAdditiveService } from '@services/contract-additive/contract-additive.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateContractAdditiveComponent } from '@components/create-contract-additive/create-contract-additive.component';
import { ConfirmComponent } from '@components/confirm/confirm.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contract-additive',
  templateUrl: './contract-additive.component.html',
  styleUrls: ['./contract-additive.component.scss'],
})
export class ContractAdditiveComponent implements OnInit, CrudPage<ContractAdditive>, OnDestroy {

  public paginateItems: Paginate<ContractAdditive>;
  public displayedColumns: string[] = [
    'number_additive', 'type', 'date_start', 'date_end', 'value', 'actions'
  ];
  public pageEvent: PageEvent;
  @Input() public contract: Contract;
  private subscriptItem: Subscription;
  constructor(
    private contractAdditiveService: ContractAdditiveService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private paginateService: PaginateService<ContractAdditive>,
  ) { }
  handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event?.pageIndex + 1, event?.pageSize);
  }
  create(): void {
    const dialogRef = this.dialog.open(CreateContractAdditiveComponent, {
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
  destroy(item: ContractAdditive): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão de aditivo`,
        body: `Confirmar exclusão do aditivo <b>${item.number_additive}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.contractAdditiveService.delete(item).subscribe(resUser => {
          this.paginateItems = this.paginateService.removeItem(item, this.paginateItems);
          this.snackBar.open(`Proposta ${item.number_additive} removida!`);
        });
      }
    });
  }
  update(item: ContractAdditive): void {
    const dialogRef = this.dialog.open(CreateContractAdditiveComponent, {
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
    this.subscriptItem = this.contractAdditiveService.list(page, perPage).subscribe(paginate => {
      this.paginateItems = paginate;
    });
  }

  ngOnInit(): void {
    this.contractAdditiveService.setContract(this.contract.id);
    this.getPage();
  }
  ngOnDestroy(): void {
    this.subscriptItem.unsubscribe();
  }

}
