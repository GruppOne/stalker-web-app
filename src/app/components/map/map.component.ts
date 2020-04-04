import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {tileLayer, Polygon, LatLngBounds, LatLng, latLng} from 'leaflet';
import {PlaceService, Geocoding} from 'src/app/services/place.service';

import {Organization, OrganizationBuilder} from '../../models/organization';
import {OrganizationService} from '../../services/organization.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  organization?: Organization;
  organizationBuilder?: OrganizationBuilder;
  options = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }),
    ],
  };

  drawOptions = {
    position: 'topright',
    draw: {
      polygon: {
        allowIntersection: false,
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
  /* polygonLayers = [
    polygon([
      [45.411618491585884, 11.887417316420397],
      [45.41143396375847, 11.887248337252458],
      [45.41123625470294, 11.888039588911852],
      [45.41145279315626, 11.888098597510183],
    ]),
  ]; */

  // @bounds used to center the map on buildings
  bounds: LatLngBounds[] = [];
  fitBounds = this.bounds;

  constructor(
    private placeService: PlaceService,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit(): void {
    this.getOrganization(1);
    this.organization?.places?.forEach((element) => {
      if (element.name && element.placeData) {
        this.polygonLayers.push(
          element.polyline
            .bindTooltip(
              '<strong>' +
                element.name.toString() +
                '</strong><br>' +
                element.placeData?.address.toString() +
                ' - ' +
                element.placeData?.zipcode.toString() +
                ' ' +
                element.placeData.city,
            )
            .setStyle({
              color: this.getRandomColor(),
            }),
        );
        this.bounds.push(element.polyline.getBounds());
      }
    });
  }

  public onDrawCreated(e: {layer: Polygon}): void {
    const a = e.layer.getLatLngs();
    const l = latLng(this.getCentroid(a[0] as LatLng[]));
    this.placeService.reverseGeocoding(l.lat, l.lng).subscribe((data: Geocoding) => {
      console.log(data);
      console.log(`possible name: ${data.address.building}`);
      console.log(`address: ${data.address.road}`);
      console.log(`city: ${data.address.city}`);
      console.log(`zipcode: ${data.address.postcode}`);
      console.log(`state: ${data.address.country}`);
    });
  }

  getOrganization(id: number): void {
    this.organizationService
      .getOrganizationById(id)
      .subscribe((response: HttpResponse<Organization>) => {
        if (response && response.status === 200 && response.body != null) {
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

  // find centroid of the drawn polygon
  getCentroid(latlngs: LatLng[]): LatLng {
    const pts = latlngs;
    const off = pts[0];
    let twicearea = 0;
    let x = 0;
    let y = 0;
    const nPts = pts.length;
    let p1;
    let p2;
    let f;
    for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
      p1 = pts[i];
      p2 = pts[j];
      f =
        (p1.lat - off.lat) * (p2.lng - off.lng) - (p2.lat - off.lat) * (p1.lng - off.lng);
      twicearea += f;
      x += (p1.lat + p2.lat - 2 * off.lat) * f;
      y += (p1.lng + p2.lng - 2 * off.lng) * f;
    }
    f = twicearea * 3;
    return new LatLng(x / f + off.lat, y / f + off.lng);
  }
}
