import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {tileLayer, Polygon, LatLngBounds} from 'leaflet';

import {Organization} from '../models/organization';
import {OrganizationService} from '../services/organization.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  organization = new Organization();
  options = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '...',
      }),
    ],
  };

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

  // empty arrays that will be populated with the data of the organizations
  // @polygonLayers used to show the perimeter of buildings
  polygonLayers: Polygon[] = [];

  // @bounds used to center the map on buildings
  bounds: LatLngBounds[] = [];
  fitBounds = this.bounds;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganization(1);

    this.organization.Places.forEach((element) => {
      this.polygonLayers.push(
        element.Polyline.bindTooltip(
          '<strong>' +
            element.Name +
            '</strong><br>' +
            element.PlaceData.Address +
            ' - ' +
            element.PlaceData.Zipcode +
            ' ' +
            element.PlaceData.City,
        ).setStyle({
          color: this.getRandomColor(),
        }),
      );
      this.bounds.push(element.Polyline.getBounds());
    });
  }

  public onDrawCreated(e: any): void {
    console.log(e.layer.getLatLngs());
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
  // generates random hex colors
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
