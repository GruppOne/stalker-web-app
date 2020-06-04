import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {forkJoin} from 'rxjs';
import {User} from 'src/app/model/classes/users/user';
import {PlaceService} from 'src/app/model/services/place.service';
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

  userPlacesTime: {placeId: number; totHours: number}[] = [];

  userMovementInfo: UserMovement[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly placeService: PlaceService,
  ) {}

  ngOnInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    const userId = +(this.route.snapshot.paramMap.get('userId') as string);
    this.setupUserHistory(userId, organizationId);
    this.getUserById(userId);
    // this.getOrgPlaces(organizationId);
  }
  /* HOW TO USE USERINPLACE TO EXTRACT INTEGER VALUES
  moment(userPlacesTime[0].totHours,'h').toMinutes().toFixed(0);
  moment(userPlacesTime[0].totHours,'h').toHours().toFixed(0);
  moment(userPlacesTime[0].totHours,'h').toSeconds().toFixed(0);
*/
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

  setupUserHistory(userId: number, orgId: number): void {
    forkJoin([
      this.userService.getUserHistory(userId, orgId),
      // this.placeService.getOrgPlaces(orgId),
    ]).subscribe((result) => {
      this.userMovementInfo = result[0];
      // this.places = result[1];
      this.getPlaceStats();
    });
  }

  getPlaceStats(): void {
    const placesData: {placeId: number; totHours: number}[] = [];
    for (let i = 0; i < this.places.length; i++) {
      placesData.push({placeId: this.places[i].placeId, totHours: 0});
      let j = 0;
      if (this.userMovementInfo[0].enter) {
        j = 1;
      } else {
        j = 2;
      }
      for (j; j <= this.userMovementInfo.length - 1; j++) {
        if (
          this.userMovementInfo[j].placeId === this.places[i].placeId &&
          !this.userMovementInfo[j].enter
        ) {
          console.log(this.userMovementInfo[j].time.toLocaleString());
          console.log(
            moment
              .duration(
                moment
                  .unix(this.userMovementInfo[j].time.getTime() / 1000)
                  .diff(moment.unix(this.userMovementInfo[j - 1].time.getTime() / 1000)) /
                  1000,
                'seconds',
              )
              .asHours(),
          );
          console.log(
            moment
              .unix(this.userMovementInfo[j - 1].time.getTime() / 1000)
              .format('HH:mm:ss'),
          );
          console.log(
            moment
              .unix(this.userMovementInfo[j].time.getTime() / 1000)
              .format('HH:mm:ss'),
          );
          placesData[i].totHours += moment
            .duration(
              moment
                .unix(this.userMovementInfo[j].time.getTime() / 1000)
                .diff(moment.unix(this.userMovementInfo[j - 1].time.getTime() / 1000)) /
                1000,
              'seconds',
            )
            .asHours();
        }
      }
    }
    placesData.sort((a, b) => (a.totHours >= b.totHours ? -1 : 1));
    this.userPlacesTime = placesData;
    console.log(this.userPlacesTime);
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
