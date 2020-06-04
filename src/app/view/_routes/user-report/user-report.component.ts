import {Component, OnInit} from '@angular/core';
import {UserMovement} from 'src/app/model/services/user.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
  userName = 'Fabio Scettro';
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

  userMovementInfo: UserMovement[] = [
    {time: new Date(1608595200), placeId: 1, enter: true},
    {time: new Date(1608620400), placeId: 1, enter: false},
    {time: new Date(1608894000), placeId: 2, enter: true},
    {time: new Date(1608897600), placeId: 2, enter: false},
  ];

  ngOnInit(): void {}

  getPlaceName(placeId: number): string {
    return this.places.find((element) => element.placeId === placeId)
      ?.placeName as string;
  }
}
