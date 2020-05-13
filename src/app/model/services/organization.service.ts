import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AdminType} from '../classes/administrator';
import {Organization} from '../classes/organizations/organization';
import {OrganizationData} from '../classes/organizations/organization-data';

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

  addOrganization(organization: Organization): Observable<boolean> {
    return this.httpClientService
      .post<OrganizationData>(`/organizations`, organization.data)
      .pipe(map(() => true));
  }

  editOrganization(organization: Organization): Observable<boolean> {
    return this.httpClientService
      .put<Organization>(`/organization/${organization.id}`, organization)
      .pipe(map(() => true));
  }
  getOrganizationById(organizationId: number): Observable<Organization> {
    return this.httpClientService
      .get<Organization>(`/organization/${organizationId}`)
      .pipe(map((response: HttpResponse<Organization>) => response.body as Organization));
  }
  getAdminOrganizations(): Observable<
    {
      id: number;
      name: string;
      description: string;
      role: AdminType;
      private: string;
    }[]
  > {
    let organizationsIds: {
      organizationId: number;
      role: string;
    }[] = [];
    this.loginService.getAdminOrganizations().subscribe(
      (
        response: {
          organizationId: number;
          role: string;
        }[],
      ) => (organizationsIds = response),
    );
    console.log(organizationsIds);
    return this.httpClientService
      .get<{organizations: Organization[]}>('/organizations')
      .pipe(
        map((response: HttpResponse<{organizations: Organization[]}>) => {
          this.organizations = (response.body as {
            organizations: Organization[];
          }).organizations;
          const adminOrganizations: {
            id: number;
            name: string;
            description: string;
            role: AdminType;
            private: string;
          }[] = [];
          // for (const iterator of organizationsIds) {
          for (const i of this.organizations) {
            const element = i;
            // if (element.id === iterator.organizationId) {
            adminOrganizations.push({
              id: element.id,
              name: element.data.name,
              description: element.data.description as string,
              role: 'Owner' as AdminType,
              private: element.data.isPrivate ? 'private' : 'public',
            });
            // }
            // }
          }
          console.log(adminOrganizations);
          console.log(organizationsIds);
          return adminOrganizations;
        }),
      );
  }
}
