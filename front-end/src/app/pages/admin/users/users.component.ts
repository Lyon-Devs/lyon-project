import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'roles'];
  public myDataArray = [
    { name: 'wellington fernandes', email: 'wellington@gmail.com', roles: 'admin , user' }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  public createUser(): void {
    console.log('open');
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data: { teste: 'name' }
    });
  }

}
