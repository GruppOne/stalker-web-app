import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LatLng} from 'leaflet';
import {of, throwError} from 'rxjs';
import {AdministratorService} from 'src/app/model/services/administrator.service';
import {ConnectedUserService} from 'src/app/model/services/connected-user.service';
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
    'addAdministrator',
    'removeAdministrator',
    'getAdministrators',
  ]);

  const connectedUserService = jasmine.createSpyObj('ConnectedUserService', [
    'getUserConnectedToOrg',
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

  let administratorAddSpy = administratorService.addAdministrator.and.returnValue(of({}));
  let administratorRemoveSpy = administratorService.removeAdministrator.and.returnValue(
    of({}),
  );
  let administratorGetSpy = administratorService.getAdministrators.and.returnValue(
    of([]),
  );
  let userOrganizationGetSpy = connectedUserService.getUserConnectedToOrg.and.returnValue(
    of([]),
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
        {provide: ConnectedUserService, useValue: connectedUserService},
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
    spyOn(console, 'error').and.callThrough();
    organizationGetSpy = organizationService.getOrganizationById.and.returnValue(
      throwError(''),
    );
    component.getOrganizationById(1);
    expect(console.error).toHaveBeenCalledWith('');
    expect(organizationGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should call Adminstrators get and handle responses', () => {
    administratorGetSpy = organizationService.getOrganizationById.and.returnValue(of([]));
    component.getOrgAdministrators(1);
    expect(administratorGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should call user connected to organization get and handle responses', () => {
    userOrganizationGetSpy = connectedUserService.getUserConnectedToOrg.and.returnValue(
      of([]),
    );
    component.getOrgUsers(1);
    expect(userOrganizationGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should not get user connected to organization in case of http errors', () => {
    spyOn(console, 'error').and.callThrough();
    userOrganizationGetSpy = connectedUserService.getUserConnectedToOrg.and.returnValue(
      throwError(''),
    );
    component.getOrgUsers(1);
    expect(console.error).toHaveBeenCalledWith('');
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

  it('should not submit the form in case of http errors', () => {
    spyOn(console, 'error').and.callThrough();
    organizationSubmitSpy = organizationService.editOrganization.and.returnValue(
      throwError(''),
    );
    component.submitOrganizationForm();
    expect(console.error).toHaveBeenCalledWith('');
  });

  it('should remove an admin correctly and handle responses', () => {
    administratorRemoveSpy = administratorService.removeAdministrator.and.returnValue(
      of(
        new HttpResponse({
          body: 'mariotest01@gmail.com',
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.deleteAdmin(1);
    expect(administratorRemoveSpy.calls.any()).toBe(true, 'sumbit done');
  });

  it('should add an admin correctly and handle responses', () => {
    administratorAddSpy = administratorService.addAdministrator.and.returnValue(
      of(
        new HttpResponse({
          body: 'mariotest01@gmail.com',
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.addAdmin();
    expect(administratorAddSpy.calls.any()).toBe(true, 'sumbit done');
  });

  it('should not add an admin in case of http errors', () => {
    spyOn(console, 'error').and.callThrough();
    administratorAddSpy = administratorService.addAdministrator.and.returnValue(
      throwError(''),
    );
    component.addAdmin();
    expect(console.error).toHaveBeenCalledWith('');
  });

  it('should find an userId given email correctly', () => {
    const result = component.checkIfEmailIsUser('mariorossi@gmail.com', [
      {id: 1, email: 'mariorossi@gmail.com', password: 'defaultpass'},
      {id: 2, email: 'giuseppeverdi@gmail.com', password: 'defaultpass2'},
    ]);
    expect(result).toBe(1);
  });
});
