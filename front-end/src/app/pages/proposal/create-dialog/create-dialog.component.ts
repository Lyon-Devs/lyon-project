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
  public formCom: FormGroup;
  public formExe: FormGroup;
  public formSummaryScope: FormGroup;
  public formDeploy: FormGroup;
  public formScope: FormGroup;
  public userListTec: User[];
  public selectedUserTec: User[] = [];
  public selectedUserCom: User[] = [];
  public filesToUpload: any[];
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
  ngOnInit(): void {
    // this.selectedUserTec = this.data.users
    this.createForm = this.data?.id ? false : true;
    this.formBasic = this.fb.group({
      client_id: [this.data?.client?.id || '', Validators.required],
      buyer_id: [this.data?.buyer_id || '', Validators.required],
      date_request: [this.data?.date_request || '', Validators.required],
      acting_branch_id: [this.data?.acting_branch_id || '', Validators.required],
      number_client_request: [this?.data?.number_client_request || '', Validators.required],
      status: [this?.data?.status || ''],
    });
    this.formTec = this.fb.group({
      date_delivery_technique_proposal: [this?.data?.date_delivery_technique_proposal || ''],
    });
    this.formCom = this.fb.group({
      date_delivery_comercial_proposal: [this?.data?.date_delivery_comercial_proposal || ''],
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
    this.formDeploy = this.fb.group({
      deadline_date_confirme: [this?.data?.deadline_date_confirme || '', Validators.required],
      deadline_time_confirme: [this?.data?.deadline_time_confirme || '', Validators.required],
      medium_histogram: [this?.data?.medium_histogram || '', Validators.required],
      observations: [this?.data?.observations || ''],

    });

    // Get all user tec and comercial
    this.userService.all().subscribe(userList => {
      this.userListTec = userList.filter(user => this.filterRole(user, 'technical'));
      this.userListCom = userList.filter(user => this.filterRole(user, 'comercial'));

      this.selectedUserTec = this.data?.users?.filter(user => this.filterRole(user, 'technical')) || [];
      this.selectedUserCom = this.data?.users?.filter(user => this.filterRole(user, 'comercial')) || [];
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
    // console.log('this.formBasic', this.formBasic);
    // console.log('this.formTec', this.formTec);
    // console.log('this.formCom', this.formCom);
    // console.log('this.formSummaryScope', this.formSummaryScope);
    // console.log('this.formScope', this.formScope);
    // console.log('this.formExe', this.formExe);
    // console.log('this.formDeploy', this.formDeploy);


    // console.log('\n\n\n');
    // console.log('this.formBasic', this.formBasic.value);
    // console.log('this.formTec', this.formTec.value);
    // console.log('this.formCom', this.formCom.value);
    // console.log('this.formSummaryScope', this.formSummaryScope.value);
    // console.log('this.formScope', this.formScope.value);
    // console.log('this.formExe', this.formExe.value);
    // console.log('this.formDeploy', this.formDeploy.value);
    const form = {
      ...this.formBasic.value,
      ...this.formTec.value,
      ...this.formCom.value,
      ...this.formSummaryScope.value,
      ...this.formScope.value,
      ...this.formExe.value,
      ...this.formDeploy.value,
      selectedUserTec: this.selectedUserTec,
      selectedUserCom: this.selectedUserCom,


    };
    const regexSecond = /:\d+$/gm;
    if (form.time_technique_visit && form.time_technique_visit.length < 8) {
      form.time_technique_visit += '00';
    } else {
      form.time_technique_visit = form.time_technique_visit?.replaceAll(':', '');
    }
    if (form.deadline_time_confirme && form.deadline_time_confirme < 8) {
      console.log('form.deadline_time_confirme', form.deadline_time_confirme);
      // console.log('regexSecond.exec(form.deadline_time_confirme)', !regexSecond.test(form.deadline_time_confirme));
      form.deadline_time_confirme += '00';
    } else {
      form.deadline_time_confirme = form.deadline_time_confirme?.replaceAll(':', '')
    }

    // clean properties
    Object.keys(form).forEach((k) => {
      if (form[k] == null || form[k] === '') {
        delete form[k];
        return;
      }
      if (Array.isArray(form[k])) {
        if (form[k].length === 0) {
          delete form[k];
        }
      }
    });
    if (this.createForm) {
      this.proposalServices.create(form).subscribe(res => {
        this.dialogRef.close('created');
        this.snackBar.open('Proposta criada com sucesso');
      });
    } else {
      form.id = this.data.id;
      this.proposalServices.update(form).subscribe(res => {
        this.dialogRef.close('updated');
        this.snackBar.open('Proposta atualizada com sucesso');
      });
    }


    // console.log('this.filesToUpload', this.filesToUpload);

  }
  public uploadDocument(event): void {
    this.filesToUpload = event.target.files;
  }
  public hasUserTec(hasUser: User): boolean {
    return this.selectedUserTec?.filter(user => user.id === hasUser.id).length ? true : false;
  }

  public hasUserCom(hasUser: User): boolean {
    return this.selectedUserCom?.filter(user => user.id === hasUser.id).length ? true : false;
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
  private filterRole(user: any, roleSlug: string): any {
    return user.roles.filter(role => role.slug === roleSlug).length > 0;
  }

}
