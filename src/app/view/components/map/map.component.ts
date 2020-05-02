import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tileLayer, Polygon, LatLngBounds, LatLng, latLng, polygon} from 'leaflet';
import {LdapConfigurationBuilder} from 'src/app/model/classes/ldapConfiguration';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';
import {PlaceService, Geocoding} from 'src/app/model/services/place.service';

import {Organization, OrganizationBuilder} from '../../../model/classes/organization';
import {OrganizationService} from '../../../model/services/organization.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  arrayCoord: LatLng[] = [];
  arrayRoad: string[] = [];
  arrayCity: string[] = [];
  arrayPostcode: string[] = [];
  arrayCountry: string[] = [];
  arrayName: string[] = [];

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
    edit: {
      poly: {
        allowIntersection: false,
      },
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
    private readonly placeService: PlaceService,
    private readonly organizationService: OrganizationService,

    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.url.toString().includes('create')) {
      const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
      this.getOrganizationById(organizationId);
    }
    if (!this.organization) {
      this.organization = new OrganizationBuilder('GruppOne', true)
        .addPlaces([
          new PlaceBuilder([
            new MyLatLng(45.411564, 11.887473),
            new MyLatLng(45.411225, 11.887325),
            new MyLatLng(45.41111, 11.887784),
            new MyLatLng(45.41144, 11.88795),
          ])
            .addPlaceData(
              new PlaceDataBuilder('Via Trieste', 'Padova', '35031', 'Italia').build(),
            )
            .addName('Torre Archimede')
            .build(),
        ])
        .addDescription('lorem ipsum...')
        .addLdapConfiguration(
          new LdapConfigurationBuilder('127.0.0.1')
            .addUsername('mario')
            .addPassword('pass')
            .build(),
        )
        .addId(2)
        .build();
    }
    if (this.organization.places) {
      for (const element of this.organization.places) {
        this.polygonLayers.push(
          polygon(element.getLatLng(element.polyline))
            .bindTooltip(
              `<strong>
          ${element.name?.toString()}</strong>` +
                `<br>${element.placeData?.address}` +
                ` - ${element.placeData?.zipcode}
          ${element.placeData?.city}`,
            )
            .setStyle({
              color: this.getRandomColor(),
            }),
        );
        this.bounds.push(polygon(element.getLatLng(element.polyline)).getBounds());
      }
    }
  }

  /**
   * adds place information to the arrays ready to be submitted
   */
  public onDrawCreated(e: {layer: Polygon}): void {
    const points = e.layer.getLatLngs();
    const center = latLng(this.getCentroid(points[0] as LatLng[]));

    /*
     * get area information, not safe to use because of errors in leaflet library
     */
    // const area = GeometryUtil.geodesicArea(a[0] as LatLng[]);
    // let seeArea = '';
    // seeArea = GeometryUtil.readableArea(area, true);
    // console.log(`area: ${seeArea}`);

    this.placeService
      .reverseGeocoding(center.lat, center.lng)
      .subscribe((data: Geocoding) => {
        let name = data.display_name.substring(0, data.display_name.indexOf(','));
        if (
          // name starts with 'Via' or contains only numbers
          name.startsWith('Via') ||
          Number(data.display_name.substring(0, data.display_name.indexOf(',')))
        ) {
          name = '';
        }
        this.arrayCoord.push(points[0] as LatLng);
        this.arrayRoad.push(data.address.road);
        this.arrayCity.push(data.address.city);
        this.arrayPostcode.push(data.address.postcode);
        this.arrayCountry.push(data.address.country);
        this.arrayName.push(name);
        console.log(`coord: ${points}`);
        console.log(`possible name: ${name}`);
        console.log(`address: ${data.address.road}`);
        console.log(`city: ${data.address.city}`);
        console.log(`zipcode: ${data.address.postcode}`);
        console.log(`state: ${data.address.country}`);
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

  /**
   * return a random hex color
   */
  getRandomColor(): string {
    const hexadecimalDigits = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexadecimalDigits[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * return the centroid of the given polygon
   */
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
