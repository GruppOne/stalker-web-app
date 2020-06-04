import {Component, OnInit} from '@angular/core';
import {UserService, UserMovement} from 'src/app/model/services/user.service';
import {User} from 'src/app/model/classes/users/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  user?: User;
  places = [
    {
      placeId: 1,
      placeName: 'Torre Archimede',
    },
    {
      placeId: 2,
      placeName: 'Complesso Paolotti',
    },
  ];

  userMovementInfo: UserMovement[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    const userId = +(this.route.snapshot.paramMap.get('userId') as string);
    this.getUserHistory(userId, organizationId);
    this.getUserById(userId);
    // this.getOrgPlaces(organizationId);
  }

  getPlaceName(placeId: number): string {
    return this.places.find((element) => element.placeId === placeId)
      ?.placeName as string;
  }

  getUserById(userId: number): void {
    this.userService
      .getUserById(userId)
      .subscribe((response: User) => (this.user = response));
  }

  /*
  getOrgPlaces(orgId: number): void {
    this.placeService
      .getOrgPlaces(orgId)
      .subscribe((response: Place[]) => (this.places = response));
  } */

  getUserHistory(userId: number, orgId: number): void {
    this.userService
      .getUserHistory(userId, orgId)
      .subscribe((response: UserMovement[]) => {
        this.userMovementInfo = response;
        console.log(response);
      });
  }
}
