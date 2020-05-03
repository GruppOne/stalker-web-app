import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

import {AdminType} from '../classes/administrator';
import {Organization} from '../classes/organization';

import {HttpClientService} from './http-client.service';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly loginService: LoginService,
  ) {}

  organizations: Organization[] = [];

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
    return this.httpClientService
      .get<{organizations: Organization[]}>('/organizations')
      .pipe(
        map((response: HttpResponse<{organizations: Organization[]}>) => {
          this.organizations = (response.body as {
            organizations: Organization[];
          }).organizations;
          for (const i of this.organizations) {
            const element = i;
            if (element.id === organizationId) {
              return element;
            }

            throwError('organization not found');
          }
          return {} as Organization;
        }),
      );
  }
  getAdminOrganizations(): Observable<{organization: Organization; role: AdminType}[]> {
    const organizationsIds: {
      organizationId: number;
      role: string;
    }[] = this.loginService.getAdminOrganizations();
    return this.httpClientService
      .get<{organizations: Organization[]}>('/organizations')
      .pipe(
        map((response: HttpResponse<{organizations: Organization[]}>) => {
          this.organizations = (response.body as {
            organizations: Organization[];
          }).organizations;
          const adminOrganizations: {organization: Organization; role: AdminType}[] = [];
          for (const iterator of organizationsIds) {
            for (const i of this.organizations) {
              const element = i;
              if (element.id === iterator.organizationId) {
                adminOrganizations.push({
                  organization: element,
                  role: iterator.role as AdminType,
                });
              }
            }
          }
          return adminOrganizations;
        }),
      );
  }
}
