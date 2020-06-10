import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {AdminType} from '../classes/administrator';

import {AdministratorService} from './administrator.service';
import {HttpClientService} from './http-client.service';
import {UserService} from './user.service';

describe('AdministratorService', () => {
  const defaultUser = {id: 1, data: {email: 'testadmin'}};

  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    'post',
    'get',
    // 'put',
    'delete',
  ]);
  const userService = jasmine.createSpyObj('UserService', ['getUsersConnectedToOrg']);
  const defaultAdministrator = {userId: 1, email: 'testadmin', role: AdminType.manager};
  let service: AdministratorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HttpClientService, useValue: httpClientService},
        {provide: UserService, useValue: userService},
      ],
    });
    service = TestBed.inject(AdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the administrators post for adding', () => {
    const httpPostSpy = httpClientService.post.and.returnValue(
      of(
        new HttpResponse({
          body: null,
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result = false;
    service
      .addAdministrator(1, defaultAdministrator)
      .subscribe((response) => (result = response));
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
    expect(result).toEqual(true);
  });
  it('should call the administrators delete for removing', () => {
    const httpDeleteSpy = httpClientService.delete.and.returnValue(
      of(
        new HttpResponse({
          body: null,
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    let result = false;
    service.removeAdministrator(1, 1).subscribe((response) => (result = response));
    expect(httpDeleteSpy.calls.any()).toBe(true, 'post called');
    expect(result).toEqual(true);
  });
  it('should call the administrators get', () => {
    const httpGetSpy = httpClientService.get.and.returnValue(
      of(
        new HttpResponse({
          body: {usersWithRoles: [defaultAdministrator]},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    const userServiceSpy = userService.getUsersConnectedToOrg.and.returnValue(
      of([defaultUser]),
    );
    let result = [{userId: 1, email: '', role: AdminType.viewer}];
    service.getAdministrators(1).subscribe((response) => (result = response));
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
    expect(userServiceSpy.calls.any()).toBe(true, 'users connected get called');
    expect(result[0]).toEqual(defaultAdministrator);
  });
});
