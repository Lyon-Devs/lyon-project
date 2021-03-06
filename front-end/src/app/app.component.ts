import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(private router: Router) {
  }
  private externalRoutes = [
    'login',
    '/401',
    '/404',
  ];

  public isExternal(): boolean {
    for (const route of this.externalRoutes) {
      if (this.router.url.toString().indexOf(route) > -1) {
        return false;
      }
    }
    return true;
  }
}
