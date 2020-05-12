import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {User} from '../classes/users/user';

import {HttpClientService} from './http-client.service';
import {UserService} from './user.service';

describe('UserService', () => {
  let service: UserService;
  const httpClientService = jasmine.createSpyObj('HttpClient', [
    // 'post',
    'get',
    // 'put',
    // 'delete',
  ]);

  const defaultUser = {id: 1, userData: {email: 'default@mail'}};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClientService, useValue: httpClientService}],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call httpClientService get', () => {
    const httpGetSpy = httpClientService.get.and.returnValue(
      of(new HttpResponse({body: defaultUser, headers: new HttpHeaders(), status: 200})),
    );
    let result: User = {id: 1, userData: {email: ''}};
    service.getUserById(1).subscribe((response) => (result = response));
    expect(result).toEqual(defaultUser);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
