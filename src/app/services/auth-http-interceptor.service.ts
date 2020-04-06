import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

import {User} from '../models/users/user';

type BodyType = User | {email: string; password: string};
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
        authorization: environment.apiKey as string,
      },
    });
    console.log(req);
    // }
    return next.handle(req);
  }
}
