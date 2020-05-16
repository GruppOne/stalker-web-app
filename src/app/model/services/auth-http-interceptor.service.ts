import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Organization} from '../classes/organizations/organization';
import {OrganizationData} from '../classes/organizations/organization-data';
import {User} from '../classes/users/user';

import {Geocoding} from './place.service';

export type BodyType =
  | User
  | {email: string; password: string}
  | Organization
  | Geocoding
  | OrganizationData;
@Injectable({
  providedIn: 'root',
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<BodyType>,
    next: HttpHandler,
  ): Observable<HttpEvent<BodyType>> {
    if (
      localStorage.getItem('user_email') &&
      localStorage.getItem('token') &&
      !req.url.includes('user/login')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    console.log(req);
    return next.handle(req);
  }
}
