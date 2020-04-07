import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Organization} from '../models/organization';

import {StalkerEndpoint} from './stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private readonly stalkerEndpoint: StalkerEndpoint;
  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/organizations');
  }

  // TODO: implement adding organization
  /* add(organization: Organization): any {
    return this.httpStalker
      .fakeAddOrganization(this.organizationURL, organization)
      .pipe(catchError(this.handleError<any>([])));
  } */

  editOrganization(organization: Organization): Observable<HttpResponse<Organization>> {
    this.stalkerEndpoint.setPath(`/organizations/${organization.id}`);
    return this.stalkerEndpoint.put<Organization>(organization);
  }
  getOrganizationById(organizationId: number): Observable<HttpResponse<Organization[]>> {
    console.log(organizationId);
    this.stalkerEndpoint.setPath('/organizations');
    return this.stalkerEndpoint.get<Organization[]>();
  }
}
