import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractRenegotiationService } from '../../services/contract-renegotiation/contract-renegotiation.service';

@Component({
  selector: 'app-create-contract-renegotiation',
  templateUrl: './create-contract-renegotiation.component.html',
  styleUrls: ['./create-contract-renegotiation.component.scss']
})
export class CreateContractRenegotiationComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateContractRenegotiationComponent>,
    private contractRenegotiationService: ContractRenegotiationService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm = this.data?.id ? false : true;
    console.log(this.data);
    this.formType = this.fb.group({
      number_renegotiation: [this.data?.number_renegotiation || '', Validators.required],
      readjustment_base: [this.data?.readjustment_base || '', Validators.required],
      year: [this.data?.year || '', Validators.required],
      purchasing_period: [this.data?.purchasing_period || '', Validators.required],
      required: [this.data?.required || '', Validators.required],
      approved: [this.data?.approved || '', Validators.required],
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
    const form = this.formType.value;
    form.contract_id = this.data.contract_id;
    if (this.createForm) {
      this.contractRenegotiationService.create(form).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Repactuações criado com sucesso');
      });
    } else {
      form.id = this.data.id;
      this.contractRenegotiationService.update(form).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Repactuações atualizado com sucesso');
      }, error => console.log('error', error));
    }

  }

}
