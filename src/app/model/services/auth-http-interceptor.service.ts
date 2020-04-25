import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Organization} from '../classes/organization';
import {User} from '../classes/users/user';

import {Geocoding} from './place.service';

export type BodyType =
  | User
  | {email: string; password: string}
  | Organization
  | Geocoding;
@Injectable({
  providedIn: 'root',
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<BodyType>,
    next: HttpHandler,
  ): Observable<HttpEvent<BodyType>> {
    // if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
    req = req.clone({
      setHeaders: {
        'STALKER-ADMIN-API-KEY': 'apirandomKey1',
      },
    });
    console.log(req);
    // }
    return next.handle(req);
  }
}
