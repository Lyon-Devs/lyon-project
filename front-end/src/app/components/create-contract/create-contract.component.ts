import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractService } from '../../services/contract/contract.service';
import { ProposalService } from '../../services/proposal/proposal.service';
import { Proposal } from '@models/proposal.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  public proposal: Proposal[];
  public filteredOptions: Observable<string[]>;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateContractComponent>,
    private contractService: ContractService,
    private snackBar: MatSnackBar,
    private proposalService: ProposalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    this.createForm = this.data?.id ? false : true;
    this.formType = this.fb.group({
      center_of_cost: [this.data?.center_of_cost || '', Validators.required],
      contract_number: [this.data?.contract_number || '', Validators.required],
      purchase_order: [this.data?.purchase_order || '', Validators.required],
      manager_lyon: [this.data?.manager_lyon || '', Validators.required],
      manager_lyon_email: [this.data?.manager_lyon_email || '', Validators.required],
      manager_client: [this.data?.manager_client || '', Validators.required],
      manager_client_email: [this.data?.manager_client_email || '', Validators.required],
      date_start: [this.data?.date_start || '', Validators.required],
      date_end: [this.data?.date_end || '', Validators.required],
      readjustment_base_date: [this.data?.readjustment_base_date || '', Validators.required],
      proposal_id: [this.data?.proposal_id || '', Validators.required],
    });
    this.proposalService.all().subscribe(proposal => {
      this.proposal = proposal;
    });
    if (!this.createForm) {
      this.formType.controls.proposal_id.disable({ onlySelf: true });
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {

    if (this.createForm) {
      this.contractService.create(this.formType.value).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Contrato criado com sucesso');
      });
    } else {
      const newType = this.formType.value;
      newType.id = this.data.id;
      newType.proposal_id = this.data?.proposal_id;
      this.contractService.update(newType).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Contrato atualizado com sucesso');
      }, error => console.log('error', error));
    }
  }

}
