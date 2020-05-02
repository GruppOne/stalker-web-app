import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Organization} from '../classes/organization';

import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private readonly httpClientService: HttpClientService) {}

  addOrganization(organization: Organization): Observable<Organization> {
    return this.httpClientService
      .post<Organization>(`/organizations`, organization)
      .pipe(map((response: HttpResponse<Organization>) => response.body as Organization));
  }

  editOrganization(organization: Organization): Observable<Organization> {
    return this.httpClientService
      .put<Organization>(`/organization/${organization.id}`, organization)
      .pipe(map((response: HttpResponse<Organization>) => response.body as Organization));
  }
  getOrganizationById(organizationId: number): Observable<Organization> {
    console.log(organizationId);
    return this.httpClientService
      .get<{organizations: Organization[]}>('/organizations')
      .pipe(
        map(
          (response: HttpResponse<{organizations: Organization[]}>) =>
            (response.body as {organizations: Organization[]}).organizations[
              organizationId
            ],
        ),
      );
  }
}
