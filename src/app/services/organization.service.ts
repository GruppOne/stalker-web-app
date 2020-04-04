import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Organization} from '../models/organization';

import {StalkerEndpoint} from './stalker-endpoint';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private stalkerEndpoint: StalkerEndpoint;
  constructor(httpClient: HttpClient) {
    this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/organization');
  }

  // TODO: implement adding organization
  /* add(organization: Organization): any {
    return this.httpStalker
      .fakeAddOrganization(this.organizationURL, organization)
      .pipe(catchError(this.handleError<any>([])));
  } */

  getOrganizationById(organizationId: number): Observable<HttpResponse<Organization>> {
    this.stalkerEndpoint.setPath('/organization/' + organizationId.toString());
    return this.stalkerEndpoint.get<Organization>();
  }
}
