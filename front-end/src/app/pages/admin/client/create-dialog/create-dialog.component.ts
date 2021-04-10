import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActingBranchService } from '@services/acting-branch/acting-branch.service';
import { ClientsService } from '@services/clients/clients.service';
import { ActingBranch } from '../../../../models/acting-branch.model';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  public actingBranches: ActingBranch[];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private actingBranchService: ActingBranchService,
    private clientService: ClientsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.actingBranchService.all().subscribe(actingBranches => {
      this.actingBranches = actingBranches;
    });
    this.createForm = this.data?.id ? false : true;
    this.formType = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      acting_branches_id: [this.data?.acting_branches_id || '', Validators.required]
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {

    if (this.createForm) {
      this.clientService.create(this.formType.value).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Ramo de atuação criado com sucesso');
      });
    } else {
      const newType = this.formType.value;
      newType.id = this.data.id;
      this.clientService.update(newType).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Ramo de atuação atualizado com sucesso');
      }, error => console.log('error', error));
    }

  }

}
