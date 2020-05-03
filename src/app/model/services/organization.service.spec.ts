import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {AdminType} from '../classes/administrator';
import {Organization} from '../classes/organization';

import {HttpClientService} from './http-client.service';
import {LoginService} from './login.service';
import {OrganizationService} from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    'post',
    'get',
    'put',
    // 'delete',
  ]);
  const loginService = jasmine.createSpyObj('LoginService', ['getAdminOrganizations']);
  let httpGetSpy = httpClientService.get.and.returnValue(
    of(
      new HttpResponse({
        body: [
          {id: 0, name: 'unipd', isPrivate: false},
          {id: 1, name: 'unipd', isPrivate: false},
        ],
        headers: new HttpHeaders(),
        status: 200,
      }),
    ),
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: HttpClientService, useValue: httpClientService},
        {provide: LoginService, useValue: loginService},
      ],
    });
    service = TestBed.inject(OrganizationService);
  });
  it('should add an organization', () => {
    const HttpPostSpy = httpClientService.post.and.returnValue(
      of(
        new HttpResponse({
          body: {id: 0, name: 'unipd', isPrivate: false},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result: Organization = {
      id: 1,
      name: '',
      isPrivate: false,
    };
    service
      .addOrganization({id: 0, name: 'unipd', isPrivate: false})
      .subscribe((response) => (result = response));
    expect(HttpPostSpy.calls.any()).toBe(true, 'get called');
    expect(result).toEqual({id: 0, name: 'unipd', isPrivate: false});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get organization given the id', () => {
    httpGetSpy = httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {id: 0, name: 'unipd', isPrivate: false},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result: Organization = {
      id: 1,
      name: '',
      isPrivate: false,
    };
    service.getOrganizationById(0).subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(result).toEqual({id: 0, name: 'unipd', isPrivate: false});
  });

  it(
    'should get info of the organization a user is' + ' an administrator of and the role',
    () => {
      httpGetSpy = httpClientService.get.and.returnValue(
        of(
          new HttpResponse({
            body: {
              organizations: [
                {id: 0, name: 'unipd', description: 'siamo unipd', isPrivate: false},
                {id: 1, name: 'gruppOne', description: 'siamo gruppOne', isPrivate: true},
              ],
            },
            headers: new HttpHeaders(),
            status: 200,
          }),
        ),
      );
      const adminOrgGetSpy = loginService.getAdminOrganizations.and.returnValue([
        {organizationId: 0, role: AdminType.viewer},
        {organizationId: 1, role: AdminType.manager},
      ]);
      const expectedresult: {
        id: number;
        name: string;
        description: string;
        role: AdminType;
        private: string;
      }[] = [
        {
          id: 0,
          name: 'unipd',
          description: 'siamo unipd',
          role: AdminType.viewer,
          private: 'public',
        },
        {
          id: 1,
          name: 'gruppOne',
          description: 'siamo gruppOne',
          role: AdminType.manager,
          private: 'private',
        },
      ];
      let actualResult: {
        id: number;
        name: string;
        description: string;
        role: AdminType;
        private: string;
      }[] = [];
      service.getAdminOrganizations().subscribe((response) => (actualResult = response));
      expect(actualResult).toEqual(expectedresult);
      expect(httpGetSpy.calls.any()).toBe(true, 'get called');
      expect(adminOrgGetSpy.calls.any()).toBe(true, 'getAdmiOrg called');
    },
  );
  it('should put the modified organization', () => {
    const httpPutSpy = httpClientService.put.and.returnValue(
      of(
        new HttpResponse({
          body: {name: 'unipd', isPrivate: false},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result: {name: string; isPrivate: boolean} = {name: '', isPrivate: false};
    service
      .editOrganization({name: 'unipd', isPrivate: false})
      .subscribe((response) => (result = response));
    expect(httpPutSpy.calls.any()).toBe(true, 'put called');
    expect(result).toEqual({name: 'unipd', isPrivate: false});
  });
});
