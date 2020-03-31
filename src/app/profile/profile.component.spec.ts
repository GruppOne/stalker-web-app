import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {User} from '../models/user';
import {UserService} from '../services/user.service';

import {ProfileComponent} from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const userService = jasmine.createSpyObj('UserService', ['getUserById']);
  const userSpy = userService.getUserById.and.returnValue(
    of(new HttpResponse({body: null, headers: new HttpHeaders(), status: 200})),
  );
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

  it('should call getUser()', () => {
    expect(userSpy.calls.any()).toBe(true, 'getUserById called');
  });
  it('getUser() should update User', () => {
    const newUser: User = new User('notmariorossi@gmail.com');
    const userSpywithDatas = userService.getUserById.and.returnValue(
      of(
        new HttpResponse({
          body: newUser,
          headers: new HttpHeaders(),
          status: 200,
        }),
      ),
    );
    component.getUser(1);
    expect(userSpywithDatas.calls.any()).toBe(
      true,
      'getUserById called and returned data',
    );
    expect(component.user).toEqual(newUser);
  });
});
