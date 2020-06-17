import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import * as sha512 from 'js-sha512';
import {LoginService} from 'src/app/model/services/login.service';

import {User, UserBuilder} from '../../../model/classes/users/user';
import {UserData} from '../../../model/classes/users/user-data';
import {UserService} from '../../../model/services/user.service';
import {InsertEmailDialogComponent} from '../../components/insert-email-dialog/insert-email-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fetched?: boolean;
  private userBuilder?: UserBuilder;
  user?: User;
  hide = true;
  creationDate = '';
  oldhide = true;
  totAdmin: number[] = [0, 0, 0];
  changePasswordGroup = this.formBuilder.group({
    oldPwdCtrl: [],
    pwdCtrl: [],
  });
  userLevel = 0;
  // eslint-disable-next-line max-params
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly loginService: LoginService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const userId = +(this.route.snapshot.paramMap.get('id') as string);
    this.getUser(userId);
    this.getAdminOrganizations();
    this.getLevel();
  }

  /**
   * Return all information of the user with the given userId
   */
  getUser(id: number): void {
    this.userService.getUserById(id).subscribe(
      (response: User) => {
        this.userBuilder = new UserBuilder()
          .addId(response.id as number)
          .addUserData(response.data as UserData);
        this.user = this.userBuilder.build();
        this.fetched = true;
        this.creationDate = new Date(
          this.user?.data?.creationDateTime as string,
        ).toLocaleString();
      },
      (err: Error) => {
        console.error(err);
        this.fetched = false;
      },
    );
  }

  deleteUser(id: number): void {
    let textMessage = 'Are you sure? Deleting this account cannot be undone.';
    textMessage += `<br>Please type <span>${this.user?.data?.email}</span> to confirm.`;
    const dialogRef = this.dialog.open(InsertEmailDialogComponent, {
      data: {
        message: textMessage,
        expectedEmail: this.user?.data?.email,
      },
      panelClass: 'custom-modalbox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUserById(id).subscribe(
          () => {
            this.loginService.logout();
          },
          (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
        );
      }
    });
  }

  getAdminOrganizations(): void {
    this.loginService
      .getAdminOrganizations()
      .subscribe((response: {organizationId: number; role: string}[]) => {
        for (const iterator of response) {
          if (iterator.role === 'Owner') {
            this.totAdmin[0] += 1;
          }
          if (iterator.role === 'Manager') {
            this.totAdmin[1] += 1;
          }
          if (iterator.role === 'Viewer') {
            this.totAdmin[2] += 1;
          }
        }
      });
  }
  changePassword(oldPassword: string, newPassword: string): void {
    if (this.validateInput(newPassword) && this.validateInput(oldPassword)) {
      this.loginService
        .changePassword(sha512.sha512(oldPassword), sha512.sha512(newPassword))
        .subscribe(
          () => console.log('YOS'),
          (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
        );
    }
  }
  public validateInput(password: string): boolean {
    const regexPwd = new RegExp(
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$',
    );

    return regexPwd.test(password);
  }
  getLevel(): void {
    this.loginService
      .getUserRole(+(this.route.snapshot.paramMap.get('id') as string))
      .subscribe((response: number) => (this.userLevel = response));
  }
}
