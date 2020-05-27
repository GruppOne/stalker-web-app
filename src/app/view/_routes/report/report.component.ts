import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LdapConfigurationBuilder} from 'src/app/model/classes/organizations/ldapConfiguration';
import {OrganizationDataBuilder} from 'src/app/model/classes/organizations/organization-data';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
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
export class ReportComponent implements OnInit {
  organization?: Organization;
  private organizationBuilder?: OrganizationBuilder;

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly route: ActivatedRoute,
  ) {}

  userInPlaceChartOptions = {
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
  userInPlaceChartData = [{data: [59, 86], label: 'People inside'}];
  userInPlaceChartLabels = ['Aule Luzzati', 'Plesso Paolotti'];

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

  ngOnInit(): void {
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
}
