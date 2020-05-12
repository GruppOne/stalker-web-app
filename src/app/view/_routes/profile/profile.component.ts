import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {User, UserBuilder} from '../../../model/classes/users/user';
import {UserData} from '../../../model/classes/users/user-data';
import {UserService} from '../../../model/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fetched = false;
  private userBuilder?: UserBuilder;
  user?: User;
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
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
          .addUserData(response.userData as UserData);
        this.user = this.userBuilder.build();
        this.fetched = true;
      },
      (err: Error) => console.error(err),
    );
  }
}
