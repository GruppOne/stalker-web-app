import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {forkJoin} from 'rxjs';
import {User} from 'src/app/model/classes/users/user';
// import {PlaceService} from 'src/app/model/services/place.service';
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

  userPlacesTime: {placeId: number; totSeconds: number}[] = [];

  userMovementInfo: UserMovement[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute, // private readonly placeService: PlaceService,
  ) {}

  ngOnInit(): void {
    // const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    const userId = +(this.route.snapshot.paramMap.get('userId') as string);
    // this.setupUserHistory(userId, organizationId);
    this.setupUserHistory();
    this.getUserById(userId);
    // this.getOrgPlaces(organizationId);
  }
  /* HOW TO USE USERINPLACE TO EXTRACT INTEGER VALUES
  moment(userPlacesTime[0].totSeconds,'h').toMinutes().toFixed(0);
  moment(userPlacesTime[0].totSeconds,'h').toHours().toFixed(0);
  moment(userPlacesTime[0].totSeconds,'h').toSeconds().toFixed(0);
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

  // setupUserHistory(userId: number, orgId: number): void {
  setupUserHistory(): void {
    forkJoin([
      // this.userService.getUserHistory(userId, orgId),
      this.userService.getUserHistory(),
      // this.placeService.getOrgPlaces(orgId),
    ]).subscribe((result) => {
      this.userMovementInfo = result[0];
      // this.places = result[1];
      this.getPlaceStats();
    });
  }

  getPlaceStats(): void {
    if (this.userMovementInfo.length) {
      const placesData: {
        placeId: number;
        totSeconds: number;
      }[] = [];
      for (let i = 0; i < this.places.length; i++) {
        placesData.push({
          placeId: this.places[i].placeId,
          totSeconds: 0,
        });
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
            /* console.log(this.userMovementInfo[j].time.toLocaleString());
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
          ); */
            placesData[i].totSeconds += moment
              .duration(
                moment
                  .unix(this.userMovementInfo[j].time.getTime() / 1000)
                  .diff(moment.unix(this.userMovementInfo[j - 1].time.getTime() / 1000)) /
                  1000,
                'seconds',
              )
              .asSeconds();
          }
        }
        if (
          this.userMovementInfo[this.userMovementInfo.length - 1].enter &&
          this.userMovementInfo[this.userMovementInfo.length - 1].placeId ===
            placesData[i].placeId
        ) {
          placesData[i].totSeconds += moment
            .duration(
              moment
                .unix(moment.now() / 1000)
                .diff(
                  moment.unix(
                    this.userMovementInfo[
                      this.userMovementInfo.length - 1
                    ].time.getTime() / 1000,
                  ),
                ) / 1000,
              'seconds',
            )
            .asSeconds();
        }
      }
      placesData.sort((a, b) => (a.totSeconds >= b.totSeconds ? -1 : 1));
      this.userPlacesTime = placesData;
    }
  }

  calcolateTime(index: number): string {
    if (index + 1 < this.userMovementInfo.length) {
      const end = ((this.userMovementInfo[index + 1].time as unknown) as number) / 1000;
      const start = ((this.userMovementInfo[index].time as unknown) as number) / 1000;
      const seconds = end - start;
      return this.secondsToTime(seconds);
    } else {
      const end = Date.now() / 1000;
      const start = ((this.userMovementInfo[index].time as unknown) as number) / 1000;
      const seconds = end - start;
      return this.secondsToTime(seconds);
    }
  }

  secondsToTime(seconds: number): string {
    const days = Math.trunc(+moment.duration(seconds, 'seconds').asDays());
    const restAfterDays = seconds - days * 24 * 3600;
    const hours = Math.trunc(+moment.duration(restAfterDays, 'seconds').asHours());
    const restAfterHours = restAfterDays - hours * 3600;
    const minutes = Math.trunc(+moment.duration(restAfterHours, 'seconds').asMinutes());
    return (
      (days !== 0 ? (days === 1 ? `${days} day ` : `${days} days `) : '') +
      (hours !== 0 ? (hours === 1 ? `${hours} hour ` : `${hours} hours `) : '') +
      (minutes !== 0 || hours === 0
        ? minutes === 1
          ? `${minutes} minute`
          : `${minutes} minutes`
        : '')
    );
  }
}
