import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('login') public login: ElementRef;
  @ViewChild('recovery') public recovery: ElementRef;
  @ViewChild('changePassword') public changePassword: ElementRef;
  public hide = true;
  public loading = new BehaviorSubject<boolean>(false);
  public error: string;
  public info: string;
  public mode: ElementRef;
  public email: string;
  public token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.loading.next(false);
  }
  ngAfterViewInit(): void {
    this.token = this.route.snapshot.queryParams.token;
    this.email = this.route.snapshot.queryParams.email;
    if (this.token && this.email) {
      this.mode = this.changePassword;
    }
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
    }, error => this.traitError(error));
  }

  public recoveryUser(user: string): void {
    this.loading.next(true);
    this.authService.forgotPassword(user).subscribe(res => {
      this.loading.next(false);
      this.info = 'Foi enviado para o email, instruções para recuperar a conta';
      setTimeout(() => {
        this.info = null;
        this.mode = this.login;
      }, 8000);
    }, error => this.traitError(error));
  }


  public changeMode(element: ElementRef): void {
    this.mode = element;
  }

  public resetPassword(password: string, passwordConfirm: string): void {
    this.loading.next(true);
    this.info = 'Estamos altera sua senha';
    this.authService.resetPassword(this.email, password, this.token).subscribe(res => {
      this.info = 'Sua senha foi alterada!';
      setTimeout(() => {
        this.info = 'Estamos validando seu acesso';
        this.authUser(this.email, password);
      }, 5000);
    }, error => this.traitError(error));
  }

  private traitError(error): void {
    this.error = error?.error?.message || 'Aconteceu algum error no servidor tente de novo.';
    setTimeout(() => {
      this.error = null;
    }, 8000);
    this.loading.next(false);
  }
}
