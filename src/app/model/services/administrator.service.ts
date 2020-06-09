import {Injectable} from '@angular/core';
import {Observable, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

import {Administrator} from '../classes/administrator';

import {HttpClientService} from './http-client.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly userService: UserService,
  ) {}

  addAdministrator(
    organizationId: number,
    administrator: Administrator,
  ): Observable<boolean> {
    return this.httpClientService
      .post<{newRole: string}>(
        `/organization/${organizationId}/user/${administrator.userId}/role`,
        {
          newRole: administrator.role.toString(),
        },
      )
      .pipe(map(() => true));
  }
  removeAdministrator(
    organizationId: number,
    administratorId: number,
  ): Observable<boolean> {
    return this.httpClientService
      .delete<Administrator>(
        `/organization/${organizationId}/user/${administratorId}/role`,
      )
      .pipe(map(() => true));
  }

  getAdministrators(organizationId: number): Observable<Administrator[]> {
    return forkJoin(
      this.httpClientService.get<{usersWithRoles: Administrator[]}>(
        `/organization/${organizationId}/users/roles`,
      ),
      this.userService.getUsersConnectedToOrg(organizationId),
    ).pipe(
      map((response) => {
        console.log(response[0].body?.usersWithRoles);
        console.log(response[1]);
        const administrators = response[0].body?.usersWithRoles as Administrator[];
        for (const i of administrators) {
          for (const j of response[1]) {
            console.log(i.userId);
            if (i.userId === j.id) {
              console.log(i.userId);
              i.email = j.data?.email as string;
            }
          }
        }
        return administrators;
      }),
    );
  }
}
