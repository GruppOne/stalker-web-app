import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {tileLayer, polygon, latLngBounds} from 'leaflet';

import {Organization} from '../models/organization';
import {OrganizationService} from '../services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: 'edit-organization.component.html',
  styleUrls: ['edit-organization.component.scss'],
})
export class EditOrganizationComponent implements OnInit {
  organization = new Organization();
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  fourthFormGroup: FormGroup = new FormGroup({});

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
  };

  // TODO generare i poligoni ciclando le coordinate da organization.Places ottenendo una cosa di questo tipo:
  /* polygonLayers = [
    polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8],
    ]),
    polygon([
      [46.87671540932522, -121.60162350162865],
      [46.771473389453135, -121.68951412662865],
      [46.78558025197221, -121.54669186100365],
    ]),
  ]; */
  // questo si riferisce al [leafletLayers]="polygonLayers" nell'html
  polygonLayers = [
    polygon([
      [8.667918002363134, -279.4306629896164],
      [6.708253968671543, -279.5624989271164],
      [6.970049417296232, -278.0683583021164],
    ]),
  ];

  drawOptions = {
    position: 'topright',
    draw: {
      polygon: {
        showArea: true,
      },
      marker: false,
      polyline: false,
      circle: false,
      rectangle: false,
      circlemarker: false,
    },
  };

  // TODO generare i poligoni ciclando le coordinate da organization.Places
  bounds = latLngBounds([
    [8.667918002363134, -279.4306629896164],
    [6.708253968671543, -279.5624989271164],
    [6.970049417296232, -278.0683583021164],
  ]);

  // questo si riferisce al [leafletFitBounds]="fitBounds" nell'html e stabilisce che i poligoni che le passi si devono vedere, quindi dovrebbe centrarsi e zoomarsi da sola (si centra correttamente ma imposta lo zoom a 0)
  fitBounds = this.bounds;

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit(): void {
    this.getOrganization(1);

    this.firstFormGroup = this.formBuilder.group({
      orgNameCtrl: [this.organization.Name, Validators.required],
      orgDescriptionCtrl: [this.organization.Description, Validators.required],
    });
    // this.secondFormGroup = this.formBuilder.group({});
    this.thirdFormGroup = this.formBuilder.group({
      orgHostCtrl: [this.organization.LdapConfiguration.Host, Validators.required],
      orgUserCtrl: [this.organization.LdapConfiguration.Username, Validators.required],
      orgPwdCtrl: [this.organization.LdapConfiguration.Password, Validators.required],
    });
  }
  getOrganization(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<Organization>) => {
        if (response.status === 200 && response.body != null) {
          this.organization = response.body;
        }
      });
  }

  public onDrawCreated(e: any): void {
    console.log(e.layer.getLatLngs());
  }
}
