import {Component, OnInit} from '@angular/core';
import {UserService, UserMovement} from 'src/app/model/services/user.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  userMovementInfo: UserMovement[] = [
    {time: new Date(1608595200), placeId: 1, enter: true},
    {time: new Date(1608620400), placeId: 1, enter: false},
    {time: new Date(1608894000), placeId: 2, enter: true},
    {time: new Date(1608897600), placeId: 2, enter: false},
  ];
  constructor(private readonly userService: UserService) {}
  ngOnInit(): void {}

  getPlaceName(placeId: number): string {
    return this.places.find((element) => element.placeId === placeId)
      ?.placeName as string;
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
