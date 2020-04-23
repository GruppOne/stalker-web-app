import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {HttpClientService} from './http-client.service';
import {OrganizationService} from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    // 'post',
    'get',
    'put',
    // 'delete',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClientService, useValue: httpClientService}],
    });
    service = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get organizations list', () => {
    const httpGetSpy = httpClientService.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.getOrganizationById(1);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
  it('should put the modified organization', () => {
    const httpPutSpy = httpClientService.put.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    service.editOrganization({name: 'testOrg', id: 1, isPrivate: true});
    expect(httpPutSpy.calls.any()).toBe(true, 'put called');
  });
});
