import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-page401',
  templateUrl: './page-401.component.html',
  styleUrls: ['./page-401.component.scss']
})
export class Page401Component implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public logout = () => this.authService.logout();

}
