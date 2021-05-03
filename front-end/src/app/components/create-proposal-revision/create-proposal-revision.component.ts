import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProposalRevisionService } from '../../services/proposal-revision/proposal-revision.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-proposal-revision',
  templateUrl: './create-proposal-revision.component.html',
  styleUrls: ['./create-proposal-revision.component.scss']
})
export class CreateProposalRevisionComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  private disableMediumHistogram: boolean;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProposalRevisionComponent>,
    private proposalRevisionService: ProposalRevisionService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm = this.data?.id ? false : true;
    this.formType = this.fb.group({
      number_revision: [this.data?.number_revision || '', Validators.required],
      data_committee: [this.data?.data_committee || '', Validators.required],
      type_price: [this.data?.type_price || '', Validators.required],
      medium_histogram: [{ value: this.data?.medium_histogram || ''}],
      global_price: [this.data?.global_price || '', Validators.required],
      gross_margin: [this.data?.gross_margin || '', Validators.required],
      bdi: [this.data?.bdi || '', Validators.required],
      taxes: [this.data?.taxes || '', Validators.required],
      charge: [this.data?.charge || '', Validators.required],
      type_warning: [this.data?.type_warning || '', Validators.required],
      risks: [this.data?.risks || '', Validators.required],
      financial_taxis: [this.data?.financial_taxis || '', Validators.required],
    });
    this.formType.controls.type_price.valueChanges.subscribe(value => {
      if (value === 'menu') {
        this.formType.controls.medium_histogram.disable({ emitEvent: true });
        this.formType.controls.medium_histogram.setValue(null);
      } else {
        this.formType.controls.medium_histogram.enable({ emitEvent: false });
      }

    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
    const form = this.formType.value;
    form.proposal_id = this.data.proposal_id;
    if (this.createForm) {
      this.proposalRevisionService.create(form).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Revisão criada com sucesso');
      });
    } else {
      form.id = this.data.id;
      this.proposalRevisionService.update(form).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Revisão atualizada com sucesso');
      }, error => console.log('error', error));
    }

  }

}
