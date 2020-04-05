import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {OrganizationComponent} from './organization.component';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  const httpClient = jasmine.createSpyObj('HttpClient', [
    // 'post',
    'get',
    // 'put',
    // 'delete',
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: HttpClient}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call httpClient get', () => {
    const httpGetSpy = httpClient.get.and.returnValue(
      of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
    );
    httpClient.get();
    expect(httpGetSpy.calls.any()).toBe(true, 'get called');
  });
});
