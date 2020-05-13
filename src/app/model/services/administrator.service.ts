import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Administrator} from '../classes/administrator';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  constructor(private readonly httpClientService: HttpClientService) {}

  addAdministrator(
    organizationId: number,
    administrator: Administrator,
  ): Observable<boolean> {
    return this.httpClientService
      .post<Administrator>(
        `/organization/${organizationId}/user/${administrator.id}/role`,
        administrator,
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
    return this.httpClientService
      .get<Administrator[]>(`/organization/${organizationId}/users/connection`)
      .pipe(
        map(
          (response: HttpResponse<Administrator[]>) => response.body as Administrator[],
        ),
      );
  }
}
