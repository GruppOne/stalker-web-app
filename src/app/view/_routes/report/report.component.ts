import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseChartDirective} from 'ng2-charts';
import {LdapConfigurationBuilder} from 'src/app/model/classes/organizations/ldapConfiguration';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder, Place} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';
import {OrganizationService} from 'src/app/model/services/organization.service';

import {
  Organization,
  OrganizationBuilder,
} from '../../../model/classes/organizations/organization';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements AfterViewInit {
  organization?: Organization;
  private organizationBuilder?: OrganizationBuilder;

  @ViewChild('map') mapDataChild?: {
    placeColors: string[];
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly route: ActivatedRoute,
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
      data: [59, 86],
      backgroundColor: [''],
      hoverBackgroundColor: [''],
    },
    {
      type: 'bar',
      label: 'Places available',
      data: [51, 34],
      backgroundColor: [''],
      borderColor: [''],
      borderWidth: 1,
      hoverBackgroundColor: [''],
    },
  ];
  userInPlaceChartLabels: string[] = [];

  userInOrganizationChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  userInOrganizationChartData = [
    {
      data: [4, 35, 142, 146, 148, 54, 88, 107, 145],
      label: 'People inside',
    },
  ];
  userInOrganizationChartLabels = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  ngAfterViewInit(): void {
    const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
    this.getOrganizationById(organizationId);
    if (!this.organization) {
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
    }
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.drawChart();
        this.chart.chart.update();
      }
    });
  }

  /**
   * call OrganizationService to get organization with given Id
   */
  getOrganizationById(id: number): void {
    this.organizationService.getOrganizationById(id).subscribe(
      (response: Organization) => {
        this.organization = response;
      },
      (err: Error) => console.error(err),
    );
  }

  drawChart(): void {
    const backgroundTot: string[] = [];
    const backgroundMax: string[] = [];
    const backgroundHoverTot: string[] = [];
    const backgroundHoverMax: string[] = [];

    for (const iterator of this.mapDataChild?.placeColors as string[]) {
      backgroundTot.push(`${this.hexToRgb(iterator)}, 0.8)`);
      backgroundMax.push(`${this.hexToRgb(iterator)}, 0.3)`);
      backgroundHoverTot.push(`${this.hexToRgb(iterator)}, 1)`);
      backgroundHoverMax.push(`${this.hexToRgb(iterator)}, 0.6)`);
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
    for (const iterator of this.organization?.data.places as Place[]) {
      this.userInPlaceChartLabels.push(iterator.data.name as string);
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
}
