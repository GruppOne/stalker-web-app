import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {tileLayer, polygon, Polygon, latLngBounds} from 'leaflet';

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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
  };

  polygonLayers = [
    polygon([
      [45.41168251127476, 11.888190865647633],
      [45.41131722132349, 11.888432264458974],
      [45.41121554225691, 11.888850689065293],
      [45.41158083286581, 11.889140367638905],
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
    [45.411564, 11.887473],
    [45.411225, 11.887325],
    [45.41111, 11.887784],
    [45.41144, 11.88795],
    [45.41168251127476, 11.888190865647633],
    [45.41131722132349, 11.888432264458974],
    [45.41121554225691, 11.888850689065293],
    [45.41158083286581, 11.889140367638905],
  ]);

  // questo si riferisce al [leafletFitBounds]="fitBounds" nell'html e stabilisce che i poligoni che le passi si devono vedere, quindi dovrebbe centrarsi e zoomarsi da sola (si centra correttamente ma imposta lo zoom a 0)
  fitBounds = this.bounds;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganization(1);

    this.organization.Places.forEach((element) => {
      if (this.polygonLayers) {
        this.polygonLayers.push(element.Polyline);
      }
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
}
