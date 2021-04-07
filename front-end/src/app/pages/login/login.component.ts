import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.checkSession().subscribe(user => {
      this.router.navigate(['home']);
    });
  }


  public authUser(user, password): void {
    this.authService.authUser(user, password).subscribe((userRes) => {
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 2000);
    });
  }

}
