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
    if (
      localStorage.getItem('user_email') &&
      localStorage.getItem('token') &&
      !req.url.toString().includes('user/login')
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
