import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProposalService } from '../../../services/proposal/proposal.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private proposalService: ProposalService,
    private snackBar: MatSnackBar,
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
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
  }

}
