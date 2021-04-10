import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@models/users.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }


  public logout = () => this.authService.logout();

}
