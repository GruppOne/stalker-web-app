import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from 'src/app/model/services/login.service';

import {User, UserBuilder} from '../../../model/classes/users/user';
import {UserData} from '../../../model/classes/users/user-data';
import {UserService} from '../../../model/services/user.service';

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
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly loginService: LoginService,
  ) {}

  ngOnInit(): void {
    const userId = +(this.route.snapshot.paramMap.get('id') as string);
    this.getUser(userId);
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
      },
      (err: Error) => {
        console.error(err);
        this.fetched = false;
      },
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUserById(id).subscribe(() => {
      this.loginService.logout();
    });
  }
}
