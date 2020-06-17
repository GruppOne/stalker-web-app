import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of, throwError} from 'rxjs';
import {AdministratorService} from 'src/app/model/services/administrator.service';
import {UserService} from 'src/app/model/services/user.service';
import {CustomMaterialModule} from 'src/app/modules/material.module';

import {AdministratorComponent} from './administrator.component';

describe('AdministratorComponent', () => {
  let component: AdministratorComponent;
  let fixture: ComponentFixture<AdministratorComponent>;
  const administratorService = jasmine.createSpyObj('AdministratorService', [
    'addAdministrator',
    'removeAdministrator',
    'getAdministrators',
  ]);

  const userService = jasmine.createSpyObj('UserService', ['getUsersConnectedToOrg']);

  let userOrganizationGetSpy = userService.getUsersConnectedToOrg.and.returnValue(of([]));
  let administratorAddSpy = administratorService.addAdministrator.and.returnValue(
    of(true),
  );
  let administratorRemoveSpy = administratorService.removeAdministrator.and.returnValue(
    of(true),
  );
  let administratorGetSpy = administratorService.getAdministrators.and.returnValue(
    of([]),
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: HttpClient},
        {provide: AdministratorService, useValue: administratorService},
        {provide: UserService, useValue: userService},
        {provide: FormBuilder},
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
    fixture = TestBed.createComponent(AdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Adminstrators get and handle responses', () => {
    administratorGetSpy = administratorService.getAdministrators.and.returnValue(of([]));
    component.getOrgAdministrators(1);
    expect(administratorGetSpy.calls.any()).toBe(true, 'get called');
    expect(component.administrators.length).toEqual(0);
  });
  it('should call Adminstrators get and handle error responses', () => {
    administratorGetSpy = administratorService.getAdministrators.and.returnValue(
      throwError(''),
    );
    component.getOrgAdministrators(1);
    expect(administratorGetSpy.calls.any()).toBe(true, 'get called');
  });

  it('should call user connected to organization get and handle responses', () => {
    userOrganizationGetSpy = userService.getUsersConnectedToOrg.and.returnValue(of([]));
    component.getOrgUsers(1);
    expect(userOrganizationGetSpy.calls.any()).toBe(true, 'get called');
    expect(component.organizationUsers.length).toEqual(0);
  });

  it('should not get user connected to organization in case of http errors', () => {
    userOrganizationGetSpy = userService.getUsersConnectedToOrg.and.returnValue(
      throwError(''),
    );
    component.getOrgUsers(1);
  });

  it('should remove an admin correctly and handle responses', () => {
    administratorRemoveSpy = administratorService.removeAdministrator.and.returnValue(
      of(true),
    );
    component.deleteAdmin(1);
    expect(administratorRemoveSpy.calls.any()).toBe(true, 'sumbit done');
  });
  it('should not remove an admin in case of http errors', () => {
    administratorRemoveSpy = administratorService.removeAdministrator.and.returnValue(
      throwError(''),
    );
    component.deleteAdmin(1);
    expect(administratorRemoveSpy.calls.any()).toBe(true, 'remove call done');
  });

  it('should add an admin correctly and handle responses', () => {
    administratorAddSpy = administratorService.addAdministrator.and.returnValue(of(true));
    component.addAdmin();
    expect(administratorAddSpy.calls.any()).toBe(true, 'add call done');
  });

  it('should not add an admin in case of http errors', () => {
    administratorAddSpy = administratorService.addAdministrator.and.returnValue(
      throwError(''),
    );
    component.addAdmin();
  });

  it('should find an userId given email correctly', () => {
    const result = component.checkIfEmailIsUser('mariorossi@gmail.com', [
      {id: 1, data: {email: 'mariorossi@gmail.com'}},
      {id: 2, data: {email: 'giuseppeverdi@gmail.com'}},
    ]);
    expect(result).toBe(1);
  });
});
