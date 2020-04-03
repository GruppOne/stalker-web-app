import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/users/user';
import {StalkerEndpoint} from '../services/stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private stalkerEndpoint: StalkerEndpoint;
  constructor(private httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/user');
  }

  buildStalkerEndpoint(path: string): void {
    this.stalkerEndpoint = new StalkerEndpoint(this.httpClient, path);
  }

  getUserById(id: number): Observable<HttpResponse<User>> {
    this.buildStalkerEndpoint('/user/' + id.toString());
    return this.stalkerEndpoint.get<User>();
  }
}
