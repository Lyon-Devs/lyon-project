import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractAdditiveService } from '@services/contract-additive/contract-additive.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-create-contract-additive',
  templateUrl: './create-contract-additive.component.html',
  styleUrls: ['./create-contract-additive.component.scss']
})
export class CreateContractAdditiveComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateContractAdditiveComponent>,
    private contractAdditiveService: ContractAdditiveService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm = this.data?.id ? false : true;
    this.formType = this.fb.group({
      number_additive: [this.data?.number_additive || '', Validators.required],
      type: [this.data?.type || '', Validators.required],
      date_start: [this.data?.date_start || '', Validators.required],
      date_end: [this.data?.date_end || '', Validators.required],
      value: [this.data?.value || ''],
      deadline: [this.data?.deadline || ''],
      description: [this.data?.description || '', Validators.required],
    });
  }
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {
    const form = this.formType.value;
    form.contract_id = this.data.contract_id;

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Atenção`,
        body: `A atualização desse aditivo afeta a data final do contrato, deseja confirmar a alteração ?`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        if (this.createForm) {
          this.contractAdditiveService.create(form).subscribe(user => {
            this.dialogRef.close('created');
            this.snackBar.open('Aditivo criado com sucesso');
          });
        } else {
          form.id = this.data.id;
          this.contractAdditiveService.update(form).subscribe(user => {
            this.dialogRef.close('updated');
            this.snackBar.open('Aditivo atualizado com sucesso');
          }, error => console.log('error', error));
        }
      } else {
        this.dialogRef.close('canceled');
      }
    });


  }

}
