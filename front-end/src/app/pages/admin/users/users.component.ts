import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { UserService } from '@services/user/user.service';
import { User } from '@models/users.model';
import { Paginate } from '@models/paginate.model';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'roles', 'created_at', 'actions'];
  public myDataArray: any;
  public paginateUser: Paginate<User>;

  public pageEvent: PageEvent;
  constructor(
    private dialog: MatDialog,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  public handlePageEvent(event: PageEvent): void {
    console.log('event', event.pageIndex + 1);
    this.getPage(event.pageIndex + 1, event.pageSize);
  }
  public createUser(): void {
    console.log('open');
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: { teste: 'name' }
    });
  }

  private getPage(page: number = 0, perPage: number = 10): void {
    this.userService.list(page, perPage).subscribe(paginate => {
      console.log('paginate', paginate);
      this.paginateUser = paginate;
    });
  }

}
