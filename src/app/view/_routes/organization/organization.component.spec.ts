import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {OrganizationService} from '../../../model/services/organization.service';

import {OrganizationComponent} from './organization.component';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
  ]);
  let organizationSpy = organizationService.getOrganizationById.and.returnValue(
    of(
      new HttpResponse({
        body: {organizations: [{}]},
        headers: new HttpHeaders(),
        status: 400,
      }),
    ),
  );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: OrganizationService,
          useValue: organizationService,
        },
      ],
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

  it('should call Organization get and handle empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of(
        new HttpResponse({
          body: {organizations: [{}]},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of(
        new HttpResponse({
          body: {organizations: [{name: 'unipd', isPrivate: false}]},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
});
