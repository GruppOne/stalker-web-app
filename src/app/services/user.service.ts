import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/users/user';
import {StalkerEndpoint} from '../services/stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly stalkerEndpoint: StalkerEndpoint;
  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/user');
  }

  getUserById(id: number): Observable<HttpResponse<User>> {
    this.stalkerEndpoint.setPath('/user/' + id.toString());
    return this.stalkerEndpoint.get<User>();
  }
}
