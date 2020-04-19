import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../classes/users/user';

import {StalkerEndpoint} from './stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly stalkerEndpoint: StalkerEndpoint;
  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/users');
  }

  getUserById(id: number): Observable<HttpResponse<User>> {
    this.stalkerEndpoint.setPath('/users/' + id.toString());
    return this.stalkerEndpoint.get<User>();
  }
}