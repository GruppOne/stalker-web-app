import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';
import {AdminType} from 'src/app/model/classes/administrator';
import {OrganizationService} from 'src/app/model/services/organization.service';

import {OrganizationsComponent} from './organizations.component';

describe('OrganizationsComponent', () => {
  let component: OrganizationsComponent;
  let fixture: ComponentFixture<OrganizationsComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getAdminOrganizations',
  ]);

  let getAdminOrgSpy = organizationService.getAdminOrganizations.and.returnValue(of([]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [{provide: OrganizationService, useValue: organizationService}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with empty respose from getAdminOrganizations', () => {
    getAdminOrgSpy = organizationService.getAdminOrganizations.and.returnValue(
      throwError(''),
    );
    expect(component).toBeTruthy();
    expect(getAdminOrgSpy.calls.any()).toBe(true);
  });
  it('should create with valid response from getAdminOrganizations', () => {
    getAdminOrgSpy = organizationService.getAdminOrganizations.and.returnValue(
      of([
        {
          id: 1,
          name: 'unipd',
          description: 'lorem ipsum...',
          role: AdminType.admin,
          private: 'private',
        },
        {
          id: 2,
          name: 'GruppOne',
          description: 'sit amet...',
          role: AdminType.viewer,
          private: 'public',
        },
      ]),
    );
    expect(component).toBeTruthy();
    expect(getAdminOrgSpy.calls.any()).toBe(true);
  });
  it('should call getAdminOrganizations and handle error response', () => {
    getAdminOrgSpy = organizationService.getAdminOrganizations.and.returnValue(
      throwError(''),
    );
    component.getAdminOrganizations();
    expect(getAdminOrgSpy.calls.any()).toBe(true);
  });
});
