import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {OrganizationsComponent} from './organizations.component';
import {OrganizationService} from 'src/app/model/services/organization.service';
import {of} from 'rxjs';
import {AdminType} from 'src/app/model/classes/administrator';

describe('OrganizationsComponent', () => {
  let component: OrganizationsComponent;
  let fixture: ComponentFixture<OrganizationsComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getAdminOrganizations',
  ]);

  let getAdminSpy = organizationService.getAdminOrganizations.and.returnValue(of([]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: OrganizationService, useValue: organizationService}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with empty respose from getAdminOrganizations', () => {
    getAdminSpy = organizationService.getAdminOrganizations.and.returnValue(of([]));
    expect(component).toBeTruthy();
    expect(getAdminSpy.calls.any()).toBe(true);
  });
  it('should create with valid response from getAdminOrganizations', () => {
    getAdminSpy = organizationService.getAdminOrganizations.and.returnValue(
      of([
        {organization: {id: 1, name: 'org1', isPrivate: true}, role: AdminType.admin},
        {organization: {id: 2, name: 'org2', isPrivate: true}, role: AdminType.viewer},
      ]),
    );
    expect(component).toBeTruthy();
    expect(getAdminSpy.calls.any()).toBe(true);
  });
});
