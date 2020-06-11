import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';
import {UserDataBuilder} from 'src/app/model/classes/users/user-data';

import {UserBuilder} from '../../../model/classes/users/user';
import {UserService} from '../../../model/services/user.service';

import {ProfileComponent} from './profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from 'src/app/model/services/login.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const userService = jasmine.createSpyObj('UserService', ['getUserById']);
  const loginService = jasmine.createSpyObj('LoginService', [
    'getAdminOrganizations',
    'changePassword',
  ]);
  const userBuilder: UserBuilder = new UserBuilder()
    .addId(1)
    .addUserData(new UserDataBuilder().addEmail('notmariorossi@gmail.com').build());
  let userSpywithDatas = userService.getUserById.and.returnValue(of(userBuilder.build()));
  const getAdminSpy = loginService.getAdminOrganizations.and.returnValue(
    of([
      {organizationId: 1, role: 'Manager'},
      {organizationId: 1, role: 'Viewer'},
      {organizationId: 1, role: 'Owner'},
    ]),
  );
  const changePassSpy = loginService.changePassword.and.returnValue(of(true));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: UserService, useValue: userService},
        {provide: LoginService, useValue: loginService},
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getUser() should update User', () => {
    userSpywithDatas = userService.getUserById.and.returnValue(of(userBuilder.build()));
    component.getUser(1);
    expect(userSpywithDatas.calls.any()).toBe(
      true,
      'getUserById called and returned data',
    );
    expect(component.user).toEqual(userBuilder.build());
  });
  it('getUser() should handle http Errors', () => {
    spyOn(console, 'error').and.callThrough();
    userSpywithDatas = userService.getUserById.and.returnValue(throwError(''));
    component.getUser(1);
    expect(userSpywithDatas.calls.any()).toBe(
      true,
      'getUserById called and returned data',
    );
    expect(console.error).toHaveBeenCalledWith('');
    expect(component.user).toEqual(userBuilder.build());
  });
  it('should get administrators list', () => {
    expect(component).toBeTruthy();
    component.getAdminOrganizations();
    expect(getAdminSpy.calls.any()).toBe(true);
  });
  it('should change password', () => {
    expect(component).toBeTruthy();
    component.changePassword('Wowwow01!', 'Wowwow01!');
    expect(changePassSpy.calls.any()).toBe(true);
  });
});
