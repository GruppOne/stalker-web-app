import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
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
    of({id: 1, data: {name: 'unipd', organizationType: 'public'}}),
  );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
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
      of({id: 1, data: {name: 'unipd', organizationType: 'public'}}),
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
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationSpy = organizationService.getOrganizationById.and.returnValue(
      of({id: 1, data: {name: 'unipd', organizationType: 'public'}}),
    );
    component.getOrganizationById(1);
    expect(organizationSpy.calls.any()).toBe(true, 'get called');
  });
});
