import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() public title: string;
  @Input() public body: string;
  @Input() public confirmText: string;
  @Input() public cancelText: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      body: string,
      confirmText: string,
      cancelText: string,
    },
    public dialogRef: MatDialogRef<ConfirmComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onNoClick(type: boolean): void {
    this.dialogRef.close(type);
  }

}
