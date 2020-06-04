import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from 'src/app/model/classes/users/user';
import {UserService, UserMovement} from 'src/app/model/services/user.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  timelineOptions: string[] = ['Today', 'Yesterday', 'This week', 'Ever'];
  user?: User = {
    id: 1,
    data: {
      firstName: 'Mario',
      lastName: 'Rossi',
      birthDate: '1993/02/20',
    },
  };
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

  calcolateTime(index: number): string {
    if (index + 1 < this.userMovementInfo.length) {
      const end = ((this.userMovementInfo[index + 1].time as unknown) as number) / 1000;
      const start = ((this.userMovementInfo[index].time as unknown) as number) / 1000;
      const seconds = end - start;
      if (seconds < 3600) {
        return `~ ${Math.round(seconds / 60)} minutes`;
      } else {
        return `~ ${Math.round(seconds / 3600)} hours`;
      }
    }
    return '';
  }
}
