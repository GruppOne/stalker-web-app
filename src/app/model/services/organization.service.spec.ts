import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {HttpClientService} from './http-client.service';
import {LoginService} from './login.service';
import {OrganizationService} from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    // 'post',
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get organizations list', () => {
    httpGetSpy = httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {
            organizations: [
              {id: 0, name: 'unipd', isPrivate: false},
              {id: 1, name: 'unipd', isPrivate: false},
            ],
          },
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result: {id?: number; name: string; isPrivate: boolean} = {
      id: 1,
      name: '',
      isPrivate: false,
    };
    service.getOrganizationById(1).subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(result).toEqual({id: 1, name: 'unipd', isPrivate: false});
  });
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
