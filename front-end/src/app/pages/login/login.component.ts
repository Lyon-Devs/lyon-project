import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public authUser(user, password): void {
    this.authService.authUser(user, password);
  }

}
