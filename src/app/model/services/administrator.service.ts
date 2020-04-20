import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Administrator} from '../classes/administrator';

import {StalkerEndpoint} from './stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  private readonly stalkerEndpoint: StalkerEndpoint;

  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/organizations');
  }

  addAdministrator(
    organizationId: number,
    administrator: Administrator,
  ): Observable<HttpResponse<Administrator>> {
    this.stalkerEndpoint.setPath('/organizations/' + organizationId.toString());
    return this.stalkerEndpoint.put<Administrator>(administrator);
  }

  removeAdministrator(
    organizationId: number,
    administrator: Administrator,
  ): Observable<HttpResponse<Administrator>> {
    this.stalkerEndpoint.setPath('/organizations/' + organizationId.toString());
    return this.stalkerEndpoint.put<Administrator>(administrator);
  }
}
