import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.userService.getUserById(id).subscribe((response: any) => {
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
