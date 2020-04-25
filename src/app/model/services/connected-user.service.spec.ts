import {TestBed} from '@angular/core/testing';

import {ConnectedUserService} from './connected-user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConnectedUserService', () => {
  let service: ConnectedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [{provide: HttpClientService, useValue: httpClientService}],
    });
    service = TestBed.inject(ConnectedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
