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
      .get<User>(`/user/${id}`)
      .pipe(map((response: HttpResponse<User>) => response.body as User));
  }
  getUsersConnectedToOrg(orgId: number): Observable<User[]> {
    return this.httpClientService
      .get<{connectedUsers: User[]}>(`/organization/${orgId}/users/connections`)
      .pipe(
        map(
          (response: HttpResponse<{connectedUsers: User[]}>) =>
            response.body?.connectedUsers as User[],
        ),
      );
  }

  getStalkerUsers(): Observable<User[]> {
    return this.httpClientService
      .get<{users: User[]}>(`/users`)
      .pipe(
        map((response: HttpResponse<{users: User[]}>) => response.body?.users as User[]),
      );
  }
  disconnectUserById(orgId: number, userId: number): Observable<boolean> {
    return this.httpClientService
      .delete<boolean>(`/user/${userId}/organization/${orgId}/connection`)
      .pipe(map(() => true));
  }
  deleteUserById(userId: number): Observable<boolean> {
    return this.httpClientService
      .delete<boolean>(`/user/${userId}`)
      .pipe(map(() => true));
  }
}
