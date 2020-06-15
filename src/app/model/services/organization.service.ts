import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AdminType} from '../classes/administrator';
import {Organization} from '../classes/organizations/organization';
import {OrganizationData} from '../classes/organizations/organization-data';

import {AdministratorService} from './administrator.service';
import {HttpClientService} from './http-client.service';
import {LoginService} from './login.service';
import {UserService} from './user.service';

export interface UsersInside {
  usersInside: number;
  places: {placeId: number; usersInside: number}[];
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  usersInsideOrg: UsersInside = {usersInside: 0, places: []};
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly loginService: LoginService,
    private readonly administratorService: AdministratorService,
    private readonly userService: UserService,
  ) {}

  organizations: Organization[] = [];

  addOrganization(organizationData: OrganizationData): Observable<number> {
    return this.httpClientService
      .post<OrganizationData>(`/organizations`, organizationData)
      .pipe(
        map((response: HttpResponse<OrganizationData>) => {
          const orgId = ((response.body as unknown) as {id: number}).id;
          this.userService
            .connectUserToOrg(orgId, Number(this.loginService.getUserId()))
            .subscribe(() => {
              this.administratorService
                .addAdministrator(orgId, {
                  email: '',
                  userId: Number(this.loginService.getUserId()),
                  role: AdminType.owner,
                })
                .subscribe(() => console.log('success'));
            });
          return orgId;
        }),
      );
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
  deleteOrganizationById(organizationId: number): Observable<boolean> {
    return this.httpClientService
      .delete(`/organization/${organizationId}`)
      .pipe(map(() => true));
  }
  getUsersInsidePlaces(organizationId: number): Observable<UsersInside> {
    return this.httpClientService
      .get<UsersInside>(`/organzation/${organizationId}/users/inside`)
      .pipe(
        map((response: HttpResponse<UsersInside>) => {
          console.log(response.body);
          return response.body as UsersInside;
        }),
      );
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
          for (const iterator of organizationsIds) {
            for (const i of this.organizations) {
              const element = i;
              if (element.id === iterator.organizationId) {
                adminOrganizations.push({
                  id: element.id,
                  name: element.data.name,
                  description: element.data.description as string,
                  role: iterator.role as AdminType,
                  private: element.data.organizationType,
                });
              }
            }
          }
          console.log(organizationsIds);
          return adminOrganizations;
        }),
      );
  }
}
