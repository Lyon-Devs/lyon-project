import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
     errors: string[]
    },
    public dialogRef: MatDialogRef<ErrorComponent>,
  ) { }

  ngOnInit(): void {
    console.log('data.errors', this.data);
  }
  public close(): void {
    this.dialogRef.close();
  }

}
