import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
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
    private snackBar: MatSnackBar,
    private userService: UserService,
    private buyerService: BuyerService,
    private clientService: ClientsService,
    private typeService: TypeServices,
    private proposalServices: ProposalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


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
    this.formType = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      client_id: [this.data?.client?.id || '', Validators.required],
      acting_branch_id: [this.data?.acting_branch_?.id || '', Validators.required],
      summary_scope: [this.data?.summary_scope || '', Validators.required, Validators.toString],
      scope: [this.data?.scope || '', Validators.required, Validators.toString],
    });

    // Get all user tec and comercial
    this.userService.all().subscribe(userList => {
      this.userListTec = userList.filter(user => user.roles.filter(role => role.slug === 'technical').length > 0);
      this.userListCom = userList.filter(user => user.roles.filter(role => role.slug === 'comercial').length > 0);
    });

    this.clientService.all().subscribe(clients => {
      this.clients = clients;
    });

    this.buyerService.all().subscribe(buyers => {
      this.buyers = buyers;
    });

    this.typeService.all().subscribe(types => {
      this.types = types;
      console.log(this.types);
    });
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
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
  }

}
