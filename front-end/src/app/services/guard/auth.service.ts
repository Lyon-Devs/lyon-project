import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('lyon_0') && sessionStorage.getItem('user')) {
      const roleCheck: string = route?.data?.role;
      // this page need a role ?
      if (roleCheck) {
        // check has role
        const user: User = JSON.parse(sessionStorage.getItem('user'));
        const hasRole = user.roles.filter(role => role.slug === roleCheck);
        const superUser = user.roles.filter(role => role.slug === 'admin');
        if (hasRole.length || superUser.length) {
          return true;
        }
        // unauthorized
        // need make a 401 page
        return false;
      }
      // only auth
      return true;
    }
    // unauthenticated
    this.router.navigate(['login']);
    return false;
  }
}
