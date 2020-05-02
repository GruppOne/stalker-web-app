import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';

import {LoginService} from './model/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly location: Location,
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loginService.isLoggedIn()) {
      if (route.url.toString().includes('organization')) {
        const actualOrgId = +(route.paramMap.get('id') as string);
        if (actualOrgId) {
          if (this.loginService.checkAuthorization(actualOrgId, route.data.roles)) {
            return true;
          } else {
            this.location.back();
            return false;
          }
        } else {
          return true;
        }
      } else {
        if (route.url.toString().includes('user')) {
          if ((route.paramMap.get('id') as string) === this.loginService.getUserId()) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
