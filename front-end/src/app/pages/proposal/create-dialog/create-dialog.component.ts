import { Component, Inject, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewChecked, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '@services/user/user.service';
import { BuyerService } from '@services/buyer/buyer.service';
import { ClientsService } from '@services/clients/clients.service';
import { ProposalService } from '@services/proposal/proposal.service';
import { TypeServices } from '@services/type-service/type-service.service';

import { User } from '@models/users.model';
import { Buyer } from '@models/buyer.model';
import { Clients } from '@models/clients.model';
import { TypeServices as Type } from '@models/type-service';
import { CreateDialogComponent as CreateDialogClientComponent } from '../../admin/client/create-dialog/create-dialog.component';
import { CreateDialogComponent as CreateDialogBuyerComponent } from '../../admin/buyer/create-dialog/create-dialog.component';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit, AfterViewChecked {

  public createForm: boolean;
  public passMsg: string;
  public formBasic: FormGroup;
  public formTec: FormGroup;
  public formExe: FormGroup;
  public formSummaryScope: FormGroup;
  public formScope: FormGroup;
  public userListTec: User[];
  public selectedUserTec: User[] = [];
  public selectedUserCom: User[] = [];
  public userListCom: User[];
  public clients: Clients[];
  public buyers: Buyer[];
  public types: Type[];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private buyerService: BuyerService,
    private clientService: ClientsService,
    private typeService: TypeServices,
    private proposalServices: ProposalService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }


  // 'buyer',
  //       'number_client_request',
  //       'cod_lyon',
  //       'date_request',
  //       'date_delivery_comercial_proposal',
  //       'owner_technique_proposal',
  //       'owner_comercial_proposal',
  //       'summary_scope',
  //       'scope',
  //       'months_exec',
  //       'date_delivery_technique_proposal',
  //       'date_technique_visit',
  //       'time_technique_visit',
  //       'local_technique_visit',
  //       'details_technique_visit',
  //       'comercial_delivery',
  //       'place_to_deploys_services',
  //       'contract_time',
  //       'deadline_confirme',
  //       'medium_histogram',
  //       'observations',
  //       'status'
  ngOnInit(): void {
    this.createForm = this.data?.id ? false : true;
    this.formBasic = this.fb.group({
      client_id: [this.data?.client?.id || '', Validators.required],
      buyer_id: [this.data?.buyer?.id || '', Validators.required],
      date_request: [this.data?.date_request || '', Validators.required],
      acting_branch_id: ['', Validators.required],
      formTec: this.fb.group({
        date_delivery_technique_proposal: [],
      })
    });
    this.formTec = this.fb.group({
      date_delivery_technique_proposal: [],
    });

    this.formSummaryScope = this.fb.group({
      summary_scope: [this?.data?.summary_scope || '', Validators.required],
    });
    this.formScope = this.fb.group({
      scope: [this?.data?.summary_scope || '', Validators.required],
    });
    this.formExe = this.fb.group({
      place_to_deploys_services: [this?.data?.place_to_deploys_services || '', Validators.required],
      months_exec: [this?.data?.months_exec || '', Validators.required],
      date_technique_visit: [this?.data?.date_technique_visit || ''],
      time_technique_visit: [this?.data?.time_technique_visit || ''],
      local_technique_visit: [this?.data?.local_technique_visit || ''],
      details_technique_visit: [this?.data?.local_technique_visit || ''],
    });
    // this.formInfoTec = this.fb.group({
    //   date_delivery_technique_proposal: [this.data?.client?.id || '', Validators.required],
    //   buyer_id: [this.data?.buyer?.id || '', Validators.required],
    //   date_request: [this.data?.date_request || '', Validators.required],
    //   acting_branch_id: ['', Validators.required],
    // });
    // scope: [this.data?.scope || '', Validators.required, Validators.toString],
    // summary_scope: [this.data?.summary_scope || '', Validators.required, Validators.toString],

    // Get all user tec and comercial
    this.userService.all().subscribe(userList => {
      this.userListTec = userList.filter(user => user.roles.filter(role => role.slug === 'technical').length > 0);
      this.userListCom = userList.filter(user => user.roles.filter(role => role.slug === 'comercial').length > 0);
    });


    this.getBuyer();

    this.typeService.all().subscribe(types => {
      this.types = types;
    });

    this.getClients();
  }

  public addOrRemoveTec(event: any, user: User): void {
    if (event.checked) {
      this.selectedUserTec.push(user);
    } else {
      this.selectedUserTec.splice(this.selectedUserTec.indexOf(user), 1);
    }
  }
  public addOrRemoveCom(event: any, user: User): void {
    if (event.checked) {
      this.selectedUserCom.push(user);
    } else {
      this.selectedUserCom.splice(this.selectedUserCom.indexOf(user), 1);
    }
  }

  public createClient(): void {
    const dialogRef = this.dialog.open(CreateDialogClientComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.getClients();
      }
    });
  }
  public createBuyer(): void {
    const dialogRef = this.dialog.open(CreateDialogBuyerComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.getBuyer();
      }
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
  }

  private getBuyer(): void {
    this.buyerService.all().subscribe(buyers => {
      this.buyers = buyers;
    });
  }
  private getClients(): void {
    this.clientService.all().subscribe(clients => {
      this.clients = clients;
    });
  }

}
