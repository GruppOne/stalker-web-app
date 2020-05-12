import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of, throwError} from 'rxjs';

import {OrganizationService} from '../../../model/services/organization.service';

import {OrganizationComponent} from './organization.component';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
  ]);
  let organizationSpy = organizationService.getOrganizationById.and.returnValue(
    of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with organization got from http request', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
    );
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create without organization got from http request', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call Organization get and handle empty response', () => {
    spyOn(console, 'error').and.callThrough();
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    component.getOrganizationById(1);
    expect(console.error).toHaveBeenCalledWith('');
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, organizationData: {name: 'unipd', isPrivate: false}}),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
});
