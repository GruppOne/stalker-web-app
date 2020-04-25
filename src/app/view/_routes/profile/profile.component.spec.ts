import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {UserBuilder} from '../../../model/classes/users/user';
import {UserService} from '../../../model/services/user.service';

import {ProfileComponent} from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const userService = jasmine.createSpyObj('UserService', ['getUserById']);
  const userBuilder: UserBuilder = new UserBuilder(
    'notmariorossi@gmail.com',
    'notPassword1!',
  );
  let userSpywithDatas = userService.getUserById.and.returnValue(of(userBuilder.build()));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: UserService, useValue: userService}],
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
});
