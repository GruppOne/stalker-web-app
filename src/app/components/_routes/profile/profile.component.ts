import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

import {User, UserBuilder} from '../../../models/users/user';
import {UserData} from '../../../models/users/user-data';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fetched = false;
  private userBuilder?: UserBuilder;
  user?: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUser(1);
  }
  getUser(id: number): void {
    console.log('calling');
    this.userService.getUserById(id).subscribe((response: HttpResponse<User>) => {
      if (response && response.status === 200 && response.body != null) {
        this.userBuilder = new UserBuilder(response.body.email, response.body.password)
          .setId(response.body.id as number)
          .setUserData(response.body.userData as UserData);
        this.user = this.userBuilder.build();
      }
      if (this.user) {
        this.fetched = true;
      }
    });
    console.log('called');
  }
}
