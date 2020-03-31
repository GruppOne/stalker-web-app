import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = new User();
  fetched = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUser(1);
  }
  getUser(id: number): void {
    console.log('calling');
    this.userService.getUserById(id).subscribe((response: HttpResponse<User>) => {
      console.log(response.status);
      if (response.status === 200 && response.body != null) {
        this.user = response.body;
        this.fetched = true;
      } else {
        this.fetched = false;
      }
    });
    console.log('called');
  }
}
