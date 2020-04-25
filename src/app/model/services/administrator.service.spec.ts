import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {AdministratorService} from './administrator.service';
import {HttpClientService} from './http-client.service';
import {AdminType} from '../classes/administrator';

describe('AdministratorService', () => {
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    'post',
    'get',
    //'put',
    // 'delete',
  ]);

  let service: AdministratorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClientService, useValue: httpClientService}],
    });
    service = TestBed.inject(AdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the administrators post', () => {
    const httpPostSpy = httpClientService.post.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.addAdministrator(1, {id: 1, email: 'testadmin', role: AdminType.manager});
    expect(httpPostSpy.calls.any()).toBe(true, 'post called');
  });
  it('should call the administrators get', () => {
    const httpGetSpy = httpClientService.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.getAdministrators(1);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
