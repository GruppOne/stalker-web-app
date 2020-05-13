import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectedUserService {
  constructor(private readonly httpClientService: HttpClientService) {}

  getUserConnectedToOrg(organizationId: number): Observable<User[]> {
    return this.httpClientService
      .get<User[]>(`/organization/${organizationId}/users/connections`)
      .pipe(map((response: HttpResponse<User[]>) => response.body as User[]));
  }
}
