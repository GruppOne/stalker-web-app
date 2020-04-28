import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {ConnectedUserService} from './connected-user.service';
import {HttpClientService} from './http-client.service';

describe('ConnectedUserService', () => {
  let service: ConnectedUserService;
  const httpClientService = jasmine.createSpyObj('HttpClientService', [
    // 'post',
    'get',
    // 'put',
    // 'delete',
  ]);
  const defaultUser = {email: 'default@mail', password: 'Default1!'};
  let httpGetSpy = httpClientService.get.and.returnValue(
    of(new HttpResponse({body: defaultUser, headers: new HttpHeaders(), status: 200})),
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClientService, useValue: httpClientService}],
    });
    service = TestBed.inject(ConnectedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the httpClientService get of user connected', () => {
    httpGetSpy = httpClientService.get.and.returnValue(
      of(
        new HttpResponse({body: [defaultUser], headers: new HttpHeaders(), status: 200}),
      ),
    );
    let result: {email: string; password: string}[] = [{email: '', password: ''}];
    service.getUserConnectedToOrg(1).subscribe((response) => (result = response));
    expect(result[0]).toEqual(defaultUser);
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
