import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LatLng} from 'leaflet';
import {of} from 'rxjs';
import {AdminType} from 'src/app/model/classes/administrator';
import {AdministratorService} from 'src/app/model/services/administrator.service';
import {OrganizationService} from 'src/app/model/services/organization.service';
import {CustomMaterialModule} from 'src/app/modules/material.module';

import {MapComponent} from '../../components/map/map.component';

import {EditOrganizationComponent} from './edit-organization.component';

describe('EditOrganizationComponent', () => {
  let component: EditOrganizationComponent;
  let fixture: ComponentFixture<EditOrganizationComponent>;

  const organizationService = jasmine.createSpyObj('OrganizationService', [
    'getOrganizationById',
    'editOrganization',
  ]);

  const administratorService = jasmine.createSpyObj('AdministratorService', [
    'manageAdministrator',
  ]);

  let organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
    of(
      new HttpResponse({
        body: {organizations: []},
        headers: new HttpHeaders(),
        status: 200,
      }),
    ),
  );

  let organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
    of(
      new HttpResponse({
        body: {name: 'unipd', isPrivate: false},
        headers: new HttpHeaders(),
        status: 200,
      }),
    ),
  );

  let administratorManageSpy = administratorService.manageAdministrator.and.returnValue(
    of(
      new HttpResponse({
        body: {name: 'unipd', isPrivate: false},
        headers: new HttpHeaders(),
        status: 200,
      }),
    ),
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganizationComponent, MapComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: HttpClient},
        {provide: FormBuilder},
        {provide: OrganizationService, useValue: organizationService},
        {provide: AdministratorService, useValue: administratorService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Organization get and handle empty response', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      of(
        new HttpResponse({
          body: {organizations: []},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getOrganizationById(1);
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });
  it('should call Organization get and handle not empty response', () => {
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      of(
        new HttpResponse({
          body: {organizations: [{name: 'unipd', isPrivate: false}]},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getOrganizationById(1);
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });
  it('should submit the form correctly', () => {
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(true, 'sumbit done');
    const num = component.mapDataChild?.arrayCoord.push([new LatLng(0, 0)]);
    console.log(num);
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
      of(
        new HttpResponse({
          body: {name: 'unipd', isPrivate: false},
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.submitOrganizationForm();
    expect(organizationSubmitSpy.calls.any()).toBe(true, 'sumbit done');
  });
  it('should add an admin correctly', () => {
    administratorManageSpy = administratorService.manageAdministrator.and.returnValue(
      of(
        new HttpResponse({
          body: 'mariotest01@gmail.com',
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.deleteAdmin({
      email: 'mariotest01@gmail.com',
      role: AdminType.manager,
    });
    expect(administratorManageSpy.calls.any()).toBe(true, 'sumbit done');
  });
  it('should submit the form correctly', () => {
    administratorManageSpy = administratorService.manageAdministrator.and.returnValue(
      of(
        new HttpResponse({
          body: 'mariotest01@gmail.com',
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.addAdmin();
    expect(administratorManageSpy.calls.any()).toBe(true, 'sumbit done');
  });
});
