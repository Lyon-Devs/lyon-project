import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '@models/contract.model';
import { PaginateService } from '@services/paginate/paginate.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public subtitle: string;
  public contract: Contract;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private paginateService: PaginateService<any>,
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(params => {
      this.contract = params.ContractResolve;
      this.subtitle = `Gerenciamento do contrato ${this.contract.contract_number || '######'} da proposta ${this.contract.proposal.cod_lyon}`;
    });
  }

}
