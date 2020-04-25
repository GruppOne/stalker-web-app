import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClientService: HttpClientService) {}

  getUserById(id: number): Observable<User> {
    return this.httpClientService
      .get<User>(`/users/${id}`)
      .pipe(map((response: HttpResponse<User>) => response.body as User));
  }
}
