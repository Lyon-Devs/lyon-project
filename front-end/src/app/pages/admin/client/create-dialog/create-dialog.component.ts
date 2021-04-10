import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActingBranchService } from '@services/acting-branch/acting-branch.service';

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
    private actingBranchService: ActingBranchService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm = this.data?.id ? false : true;
    this.formType = this.fb.group({
      name: [this.data?.name || '', Validators.required],
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {

    if (this.createForm) {
      this.actingBranchService.create(this.formType.value).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Ramo de atuação criado com sucesso');
      });
    } else {
      const newType = this.formType.value;
      newType.id = this.data.id;
      this.actingBranchService.update(newType).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Ramo de atuação atualizado com sucesso');
      }, error => console.log('error', error));
    }

  }

}
