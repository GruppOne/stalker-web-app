import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

export interface UserMovement {
  time: Date;
  placeId: number;
  enter: boolean;
}

export interface UserHistoryAPI {
  id: number;
  history: {timestamp: number; placeId: number; inside: boolean}[];
}

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
  getUserHistory(organizationId: number, userId: number): Observable<UserMovement[]> {
    /*     const input: UserHistoryAPI = {
      id: 1,
      history: [
        {
          timestamp: 1590677758,
          placeId: 2,
          inside: false,
        },
        {
          timestamp: 1590678883,
          placeId: 2,
          inside: false,
        },
        {
          timestamp: 1590679603,
          placeId: 2,
          inside: true,
        },
        {
          timestamp: 1590680277,
          placeId: 2,
          inside: true,
        },
        {
          timestamp: 1590682482,
          placeId: 2,
          inside: true,
        },
        {
          timestamp: 1590682989,
          placeId: 2,
          inside: false,
        },
        {
          timestamp: 1590683530,
          placeId: 2,
          inside: true,
        },
        {
          timestamp: 1590683600,
          placeId: 2,
          inside: false,
        },
        {
          timestamp: 1591560000,
          placeId: 1,
          inside: true,
        },
      ],
    }; */
    return this.httpClientService
      .get<UserHistoryAPI>(`/organization/${organizationId}/user/${userId}/history`)
      .pipe(
        map((response: HttpResponse<UserHistoryAPI>) => {
          console.log(response.body);
          const userHistory: UserMovement[] = [];
          if (response.body) {
            for (const iterator of response.body.history) {
              if (iterator.inside) {
                if (
                  userHistory.length === 0 ||
                  !userHistory[userHistory.length - 1].enter
                ) {
                  userHistory.push({
                    time: new Date(iterator.timestamp * 1000),
                    placeId: iterator.placeId,
                    enter: true,
                  });
                }
              } else {
                if (
                  userHistory[userHistory.length - 1] &&
                  userHistory[userHistory.length - 1].enter
                ) {
                  userHistory.push({
                    time: new Date(iterator.timestamp * 1000),
                    placeId: iterator.placeId,
                    enter: false,
                  });
                }
              }
            }
          }
          console.log(userHistory.sort((a, b) => (a.time >= b.time ? -1 : 1)));
          return userHistory.sort((a, b) => (a.time >= b.time ? -1 : 1));
        }),
      );
    /*     const userHistory: UserMovement[] = [];
    if (input) {
      for (const iterator of input.history) {
        if (iterator.inside) {
          if (userHistory.length === 0 || !userHistory[userHistory.length - 1].enter) {
            userHistory.push({
              time: new Date(iterator.timestamp * 1000),
              placeId: iterator.placeId,
              enter: true,
            });
          }
        } else {
          if (
            userHistory[userHistory.length - 1] &&
            userHistory[userHistory.length - 1].enter
          ) {
            userHistory.push({
              time: new Date(iterator.timestamp * 1000),
              placeId: iterator.placeId,
              enter: false,
            });
          }
        }
      }
    }*/
  }
  connectUserToOrg(orgId: number, userId: number): Observable<boolean> {
    return this.httpClientService
      .post<null>(`/user/${userId}/organization/${orgId}/connection`, null)
      .pipe(map(() => true));
  }
}
