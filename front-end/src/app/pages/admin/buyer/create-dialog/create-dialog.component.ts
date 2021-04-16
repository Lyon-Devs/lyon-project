import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clients } from '../../../../models/clients.model';
import { BuyerService } from '@services/buyer/buyer.service';
import { ClientsService } from '@services/clients/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public createForm: boolean;
  public passMsg: string;
  public formType: FormGroup;
  public clients: Clients[];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private buyerService: BuyerService,
    private clientService: ClientsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.clientService.all().subscribe(clients => {
      this.clients = clients;
    });
    this.createForm = this.data?.id ? false : true;
    this.formType = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      client_id: [this.data?.client_id || '', Validators.required]
    });
  }
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSubmit(): void {

    if (this.createForm) {
      this.buyerService.create(this.formType.value).subscribe(user => {
        this.dialogRef.close('created');
        this.snackBar.open('Comprador criado com sucesso');
      });
    } else {
      const newType = this.formType.value;
      newType.id = this.data.id;
      this.buyerService.update(newType).subscribe(user => {
        this.dialogRef.close('updated');
        this.snackBar.open('Comprador atualizado com sucesso');
      }, error => console.log('error', error));
    }
  }
}
