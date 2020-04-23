import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {StalkerEndpoint} from './stalker-endpoint';

export interface AdminGetType {
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  private readonly stalkerEndpoint: StalkerEndpoint;

  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/organizations');
  }

  manageAdministrator(
    organizationId: number,
    administratorEmail: string,
  ): Observable<HttpResponse<string>> {
    this.stalkerEndpoint.setPath('/organizations/' + organizationId.toString());
    return this.stalkerEndpoint.put<string>(administratorEmail);
  }

  getAdministrators(organizationId: number): Observable<HttpResponse<AdminGetType[]>> {
    this.stalkerEndpoint.setPath('/organizations/' + organizationId.toString());
    return this.stalkerEndpoint.get<AdminGetType[]>();
  }
}
