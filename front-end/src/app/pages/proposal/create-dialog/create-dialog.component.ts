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
import { ProposalFilesService } from '../../../services/proposal-files/proposal-files.service';
import { ProposalFiles } from '@models/proposal-files.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit, AfterViewChecked {

  public submitting = false;
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
  public selectedUserTec: any[] = [];
  public selectedUserCom: any[] = [];
  public filesToUpload: any[];
  public userListCom: User[];
  public clients: Clients[];
  public buyers: Buyer[];
  public buyersFiltered: Buyer[];
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
    private proposalFilesService: ProposalFilesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {

    // this.selectedUserTec = this.data.users
    this.createForm = this.data?.id ? false : true;
    this.proposalFilesService.setContract(this.data?.id);

    this.formBasic = this.fb.group({
      client_id: [this.data?.client?.id || '', Validators.required],
      buyer_id: [this.data?.buyer_id || '', Validators.required],
      date_request: [this.data?.date_request || '', Validators.required],
      type_service_id: [this.data?.type_service_id || '', Validators.required],
      number_client_request: [this?.data?.number_client_request || '', Validators.required],
      status: [this?.data?.status || ''],
      deadline_date_confirme: [this?.data?.deadline_date_confirme || '', Validators.required],
      deadline_time_confirme: [this?.data?.deadline_time_confirme || '', Validators.required],
    });
    this.formTec = this.fb.group({
      date_delivery_technique_proposal: [this?.data?.date_delivery_technique_proposal || ''],
      date_technique_visit: [this?.data?.date_technique_visit || ''],
      time_technique_visit: [this?.data?.time_technique_visit || ''],
      local_technique_visit: [this?.data?.local_technique_visit || ''],
      details_technique_visit: [this?.data?.details_technique_visit || ''],
    });
    this.formCom = this.fb.group({
      date_delivery_comercial_proposal: [this?.data?.date_delivery_comercial_proposal || ''],
    });

    this.formSummaryScope = this.fb.group({
      summary_scope: [this?.data?.summary_scope || '', Validators.required],
    });
    this.formScope = this.fb.group({
      scope: [this?.data?.scope || '', Validators.required],
    });
    this.formExe = this.fb.group({
      place_to_deploys_services: [this?.data?.place_to_deploys_services || '', Validators.required],
      months_exec: [this?.data?.months_exec || '', Validators.required],
    });
    this.formDeploy = this.fb.group({
      medium_histogram: [this?.data?.medium_histogram || '', Validators.required],
      observations: [this?.data?.observations || ''],

    });

    // Get all user tec and comercial
    this.userService.all().subscribe(userList => {
      this.userListTec = userList;
      this.userListCom = userList;

      this.selectedUserTec = this.data?.owners?.filter(owner => owner.type === 'technical');
      if (this.selectedUserTec?.length) {
        this.selectedUserTec = this.selectedUserTec.map(owner => owner.user);
      } else {
        this.selectedUserTec = [];
      }

      this.selectedUserCom = this.data?.owners?.filter(owner => owner.type === 'comercial');
      if (this.selectedUserCom?.length) {
        this.selectedUserCom = this.selectedUserCom.map(owner => owner.user);
      } else {
        this.selectedUserCom = [];
      }
    });


    this.getBuyer();

    this.typeService.all().subscribe(types => {
      this.types = types;
    });

    this.getClients();

    // tslint:disable-next-line: variable-name
    this.formBasic.controls.client_id.valueChanges.subscribe(client_id => {
      this.buyersFiltered = this.buyers?.filter(buyer => buyer.client_id === client_id);
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
    this.submitting = true;
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
    if (form.deadline_time_confirme && form.deadline_time_confirme.length < 8) {
      form.deadline_time_confirme += '00';
    } else {
      form.deadline_time_confirme = form.deadline_time_confirme?.replaceAll(':', '');
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
        if (this.filesToUpload?.length) {
          this.proposalFilesService.setContract(res.id);
          this.uploadDocument().subscribe(() => {
            this.dialogRef.close('created');
            this.snackBar.open('Proposta criada com sucesso');
            this.submitting = false;
          }, error => {
            this.traitError(error);
            this.submitting = false;
          });
        } else {
          this.submitting = false;
          this.dialogRef.close('created');
          this.snackBar.open('Proposta criada com sucesso');
        }
      });
    } else {
      form.id = this.data.id;
      this.proposalServices.update(form).subscribe(res => {
        if (this.filesToUpload?.length) {
          this.uploadDocument().subscribe(() => {
            this.dialogRef.close('created');
            this.snackBar.open('Proposta criada com sucesso');
            this.submitting = false;

          }, error => {
            this.submitting = false;
            this.traitError(error);
          });
        } else {
          this.submitting = false;
          this.dialogRef.close('updated');
          this.snackBar.open('Proposta atualizada com sucesso');
        }
      }, error => {
        this.submitting = false;
        this.traitError(error);
      });

    }
  }
  public selectDocumentToUpload(event): void {
    this.filesToUpload = event.target.files;
  }

  private uploadDocument(): Observable<ProposalFiles> {
    // this.filesToUpload = event.target.files;
    const form = new FormData();
    for (const file of this.filesToUpload) {
      form.append(file.name, file);
    }
    return this.proposalFilesService.create(form);
  }
  public hasUserTec(hasUser: User): boolean {
    return this.selectedUserTec?.filter(user => user?.id === hasUser.id).length ? true : false;
  }

  public hasUserCom(hasUser: User): boolean {
    return this.selectedUserCom?.filter(user => user?.id === hasUser.id).length ? true : false;
  }

  public deleteFile(file: ProposalFiles): void {
    this.proposalFilesService.delete(file).subscribe(res => {
      this.data.files = this.data.files.filter(hasFile => hasFile.id !== file.id);
      this.snackBar.open('Arquivo removido com sucesso');
    }, error => this.traitError(error));
  }

  public downloadFile(file: ProposalFiles): void {
    window.open(`/api/proposal/${this.data.id}/files/${file.id}`, '_blank');
  }
  private getBuyer(): void {
    this.buyerService.all().subscribe(buyers => {
      this.buyers = buyers;
      this.buyersFiltered = this.buyers;
    });
  }
  private getClients(): void {
    this.clientService.all().subscribe(clients => {
      this.clients = clients;
    });
  }
  private filterOwner(owner: any, roleSlug: string): any {
    return owner.roles.filter(role => role.slug === roleSlug).length > 0;
  }

  private traitError(error): void {
    const msg = error?.error?.message || error?.statusText || 'Aconteceu algum error no servidor tente de novo.';
    this.snackBar.open(msg, 'ok');
  }

}
