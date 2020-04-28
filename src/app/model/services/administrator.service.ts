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
  ): Observable<Administrator> {
    return this.httpClientService
      .post<Administrator>(`organization/${organizationId}/users/role`, administrator)
      .pipe(
        map((response: HttpResponse<Administrator>) => response.body as Administrator),
      );
  }
  removeAdministrator(
    organizationId: number,
    administratorId: number,
  ): Observable<Administrator> {
    return this.httpClientService
      .delete<Administrator>(
        `organization/${organizationId}/users/role/${administratorId}`,
      )
      .pipe(
        map((response: HttpResponse<Administrator>) => response.body as Administrator),
      );
  }

  getAdministrators(organizationId: number): Observable<Administrator[]> {
    return this.httpClientService
      .get<Administrator[]>(`organization/${organizationId}`)
      .pipe(
        map(
          (response: HttpResponse<Administrator[]>) => response.body as Administrator[],
        ),
      );
  }
}
