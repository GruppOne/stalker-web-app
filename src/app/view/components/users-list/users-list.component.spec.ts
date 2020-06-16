import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {UserService} from 'src/app/model/services/user.service';

import {UsersListComponent} from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  const urlSegment = jasmine.createSpyObj('UrlSegment', ['toString']);

  const userService = jasmine.createSpyObj('UserService', [
    'getStalkerUsers',
    'getUsersConnectedToOrg',
    'deleteUserById',
    'disconnectUserById',
  ]);

  const activatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        id: '1',
      }),
      url: [urlSegment],
    },
  };
  userService.getStalkerUsers.and.returnValue(of([{id: 1}, {id: 2}]));
  userService.getUsersConnectedToOrg.and.returnValue(of([{id: 1}, {id: 2}]));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        {provide: UserService, useValue: userService},
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disconnect a user from an organization', () => {
    expect(component).toBeTruthy();
    component.deleteButtonAction(1, 'email');
  });
  it('should get all users', () => {
    expect(component).toBeTruthy();
    component.getStalkerUsers();
  });
  it('should delete a user from stalker', () => {
    activatedRoute.snapshot.paramMap = convertToParamMap({});
    expect(component).toBeTruthy();
    component.deleteButtonAction(1, 'email');
    activatedRoute.snapshot.paramMap = convertToParamMap({id: 1});
  });
});
