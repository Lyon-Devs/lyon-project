import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public loading = new BehaviorSubject<boolean>(false);
  public error: string;
  public mode: 'login' | 'recovery' = 'login';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loading.next(false);
  }

  ngOnInit(): void {
    this.authService.checkSession().subscribe(user => {
      this.router.navigate(['home']);
    });
  }


  public authUser(user, password): void {
    this.loading.next(true);
    this.authService.authUser(user, password).subscribe((userRes) => {
      setTimeout(() => {
        this.router.navigate(['home']);
        this.loading.next(false);
      }, 2000);
    }, error => {

      this.error = error?.error?.message || 'Acontenceu algum error no servidor tente de novo.';
      setTimeout(() => {
        this.error = null;
      }, 8000);
      this.loading.next(false);
    });
  }

  public recoveryUser(user): void {
    this.loading.next(true);
    this.authService.recoveryUser(user).subscribe(res => {
      console.log('res', res);
    });
  }

}
