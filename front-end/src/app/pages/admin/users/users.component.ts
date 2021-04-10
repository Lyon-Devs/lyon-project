import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

import { UserService } from '@services/user/user.service';

import { ConfirmComponent } from '@components/confirm/confirm.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

import { User } from '@models/users.model';
import { Paginate } from '@models/paginate.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'roles', 'created_at', 'actions'];
  public myDataArray: any;
  public paginateUser: Paginate<User>;


  public pageEvent: PageEvent = new PageEvent();
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  public handlePageEvent(event: PageEvent = this.pageEvent): void {
    this.pageEvent = event;
    this.getPage(event.pageIndex + 1, event.pageSize);
  }
  public createUser(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.handlePageEvent();
      }
    });
  }

  public editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(event => {
      this.handlePageEvent();
    });
  }
  public deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '600px',
      data: {
        title: `Exclusão usuário`,
        body: `Confirmar exclusão do usuário <b>${user.name}</b>`,
      }
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.userService.delete(user).subscribe(resUser => {
          const removedUser = this.paginateUser.data.filter(filterUser => filterUser.id !== user.id);
          if (removedUser.length) {
            this.paginateUser.data = removedUser;
            this.paginateUser.total--;
            this.snackBar.open(`Usuário ${user.name} removido! `);
          }
        });
      }
    });
  }
  private getPage(page: number = 0, perPage: number = 10): void {
    this.userService.list(page, perPage).subscribe(paginate => {
      this.paginateUser = paginate;
    });
  }


}
