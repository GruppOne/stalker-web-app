import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Organization} from '../classes/organization';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private readonly httpClientService: HttpClientService) {}

  // TODO: implement adding organization
  /* add(organization: Organization): any {
    return this.httpStalker
      .fakeAddOrganization(this.organizationURL, organization)
      .pipe(catchError(this.handleError<any>([])));
  } */

  editOrganization(organization: Organization): Observable<HttpResponse<Organization>> {
    return this.httpClientService.put<Organization>(
      `/organizations/${organization.id}`,
      organization,
    );
  }
  getOrganizationById(
    organizationId: number,
  ): Observable<HttpResponse<{organizations: Organization[]}>> {
    console.log(organizationId);
    return this.httpClientService.get<{organizations: Organization[]}>('/organizations');
  }
}
