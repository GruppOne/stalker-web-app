import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {BaseChartDirective} from 'ng2-charts';
import {forkJoin} from 'rxjs';
import {Place} from 'src/app/model/classes/places/place';
import {
  OrganizationService,
  UsersInside,
} from 'src/app/model/services/organization.service';
import {PlaceService} from 'src/app/model/services/place.service';

import {Organization} from '../../../model/classes/organizations/organization';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements AfterViewInit {
  organization?: Organization;
  organizationPlaces: Place[] = [];
  // private organizationBuilder?: OrganizationBuilder;
  usersInsideOrg: UsersInside = {usersInside: 0, places: []};
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly route: ActivatedRoute,
    private readonly placeService: PlaceService,
    private readonly snackBar: MatSnackBar,
  ) {}

  userInPlaceChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  userInPlaceChartData = [
    {
      type: 'bar',
      label: 'People inside',
      data: [] as number[],
      backgroundColor: [''],
      hoverBackgroundColor: [''],
    },
    {
      type: 'bar',
      label: 'Places available',
      data: [] as number[],
      backgroundColor: [''],
      borderColor: [''],
      borderWidth: 1,
      hoverBackgroundColor: [''],
    },
  ];
  userInPlaceChartLabels: string[][] = [];

  // userInOrganizationChartOptions = {
  //   maintainAspectRatio: false,
  //   responsive: true,
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };
  // userInOrganizationChartData = [
  //   {
  //     data: [4, 35, 142, 146, 148, 54, 88, 107, 145],
  //     label: 'People inside',
  //   },
  // ];
  // userInOrganizationChartLabels = [
  //   '07:00',
  //   '08:00',
  //   '09:00',
  //   '10:00',
  //   '11:00',
  //   '12:00',
  //   '13:00',
  //   '14:00',
  //   '15:00',
  //   '16:00',
  //   '17:00',
  //   '18:00',
  //   '19:00',
  // ];

  ngAfterViewInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);

    /* if (!this.organization) {
      this.organizationBuilder = new OrganizationBuilder(
        1,
        new OrganizationDataBuilder('GruppOne', true)
          .addPlaces([
            new PlaceBuilder(
              2,
              new PlaceDataBuilder(
                {
                  address: 'Via Trieste',
                  city: 'Padova',
                  zipcode: '35031',
                  state: 'Italia',
                },
                'Torre Archimede',
                [
                  new MyLatLng(45.411564, 11.887473),
                  new MyLatLng(45.411225, 11.887325),
                  new MyLatLng(45.41111, 11.887784),
                  new MyLatLng(45.41144, 11.88795),
                ],
              ).build(),
            ).build(),
          ])
          .addDescription('lorem ipsum...')
          .addLdapConfiguration(
            new LdapConfigurationBuilder('127.0.0.1')
              .addUsername('mario')
              .addPassword('pass')
              .build(),
          )
          .build(),
      );
      this.organization = this.organizationBuilder.build();
    } */
    this.setupGraphs(organizationId);
  }

  setupGraphs(id: number): void {
    forkJoin([
      this.organizationService.getOrganizationById(id),
      this.placeService.getOrgPlaces(id),
      this.organizationService.getUsersInsidePlaces(id),
    ]).subscribe(
      (result) => {
        this.organization = result[0];
        this.organizationPlaces = result[1];
        this.usersInsideOrg = result[2];
        console.log(this.organization);
        console.log(this.usersInsideOrg);
        this.drawChart();
        this.updateUsersInsidePlacesChart();
        setInterval(() => {
          this.organizationService
            .getUsersInsidePlaces(id)
            .subscribe((response: UsersInside) => {
              this.usersInsideOrg = response;
              this.updateUsersInsidePlacesChart();
            });
        }, 4000);
      },
      (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
    );
  }

  /**
   * call OrganizationService to get organization with given Id
   */

  /*   getUsersInsidePlaces(orgId: number): void {
    this.organizationService
      .getUsersInsidePlaces(orgId)
      .subscribe((response: UsersInside) => {
        this.usersInsideOrg = response;
        this.updateUsersInsidePlacesChart();
        this.chart?.chart.update();
        console.log('should happen before');
      });
      setInterval(() => {
      this.updateUsersInsidePlacesChart();
      this.chart?.chart.update();
    }, 3000);
  } */

  updateUsersInsidePlacesChart(): void {
    const newActualData: number[] = [];
    const newMaxData: number[] = [];
    for (const i of this.organizationPlaces) {
      const actualUsersInside = this.usersInsideOrg.places.find(
        (element: {placeId: number; usersInside: number}) => element.placeId === i.id,
      );
      newActualData.push(actualUsersInside ? actualUsersInside.usersInside : 0);
      newMaxData.push(
        actualUsersInside?.usersInside &&
          i.data.maxConcurrentUsers >= actualUsersInside.usersInside
          ? i.data.maxConcurrentUsers - actualUsersInside.usersInside
          : !actualUsersInside?.usersInside
          ? i.data.maxConcurrentUsers
          : 0,
      );
    }
    this.userInPlaceChartData[0].data = newActualData;
    this.userInPlaceChartData[1].data = newMaxData;
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }
  drawChart(): void {
    const backgroundTot: string[] = [];
    const backgroundMax: string[] = [];
    const backgroundHoverTot: string[] = [];
    const backgroundHoverMax: string[] = [];

    for (const iterator of this.organizationPlaces) {
      backgroundTot.push(`${this.hexToRgb(iterator.data.color as string)}, 0.8)`);
      backgroundMax.push(`${this.hexToRgb(iterator.data.color as string)}, 0.3)`);
      backgroundHoverTot.push(`${this.hexToRgb(iterator.data.color as string)}, 1)`);
      backgroundHoverMax.push(`${this.hexToRgb(iterator.data.color as string)}, 0.6)`);
    }
    console.log(backgroundTot);

    this.userInPlaceChartData[0] = Object.assign({}, this.userInPlaceChartData[0], {
      backgroundColor: backgroundTot,
      hoverBackgroundColor: backgroundHoverTot,
    });
    this.userInPlaceChartData[1] = Object.assign({}, this.userInPlaceChartData[1], {
      backgroundColor: backgroundMax,
      borderColor: backgroundTot,
      hoverBackgroundColor: backgroundHoverMax,
    });
    for (const iterator of this.organizationPlaces) {
      const placeName = iterator.data.name as string;
      if (this.organizationPlaces.length > 1 && placeName.length > 20) {
        this.userInPlaceChartLabels.push(this.formatLabel(placeName, 15));
      } else {
        this.userInPlaceChartLabels.push((placeName as unknown) as string[]);
      }
    }
  }

  hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hex,
    ) as RegExpExecArray;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}`;
  }

  /**
   * takes a string phrase and breaks it into separate phrases
   * no bigger than 'maxwidth', breaks are made at complete words
   */
  formatLabel(str: string, maxwidth: number): string[] {
    const sections: string[] = [];
    const words = str.split(' ');
    let temp = '';

    words.forEach((item, index) => {
      if (temp.length > 0) {
        const concat = temp + ' ' + item;
        if (concat.length > maxwidth) {
          sections.push(temp);
          temp = '';
        } else {
          if (index === words.length - 1) {
            sections.push(concat);
            return;
          } else {
            temp = concat;
            return;
          }
        }
      }
      if (index === words.length - 1) {
        sections.push(item);
        return;
      }
      if (item.length < maxwidth) {
        temp = item;
      } else {
        sections.push(item);
      }
    });
    return sections;
  }
}
