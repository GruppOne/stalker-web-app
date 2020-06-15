import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {
  tileLayer,
  Polygon,
  LatLngBounds,
  LatLng,
  latLng,
  polygon,
  FeatureGroup,
  featureGroup,
} from 'leaflet';
import {Observable, of} from 'rxjs';
import {MyLatLng} from 'src/app/model/classes/places/my-lat-lng';
import {PlaceBuilder, Place} from 'src/app/model/classes/places/place';
import {PlaceDataBuilder} from 'src/app/model/classes/places/place-data';
import {PlaceService, Geocoding} from 'src/app/model/services/place.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  organizationPlaces: Place[] = [];
  totAlreadySaved = 0;
  placeColors: string[] = [];

  options = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }),
    ],
  };
  drawOptions: unknown;
  drawnItems: FeatureGroup = featureGroup();
  // empty arrays that will be populated with the data of the organizations
  // @polygonLayers used to show the perimeter of buildings
  polygonLayers: Polygon[] = [];

  // @bounds used to center the map on buildings
  bounds: LatLngBounds[] = [];
  constructor(
    private readonly placeService: PlaceService,
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    if (this.getRoute().includes('create') || this.getRoute().includes('edit')) {
      this.drawOptions = {
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
          featureGroup: null,
          edit: false,
          poly: false,
          remove: false,
        },
      };
    } else {
      this.drawOptions = {
        draw: {
          polygon: false,
          marker: false,
          polyline: false,
          circle: false,
          rectangle: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: null,
          edit: false,
          poly: false,
          remove: false,
        },
      };
    }
    if (!this.route.snapshot.url.toString().includes('create')) {
      const organizationId = +(this.route.snapshot.paramMap.get('id') as string);
      this.getOrgPlaces(organizationId);
      this.bounds.push(
        polygon([
          [45.493352, 11.99852],
          [45.488539, 11.734372],
          [45.342976, 11.731628],
          [45.35118, 12.000578],
        ]).getBounds(),
      );
    } else {
      this.bounds.push(
        polygon([
          [45.413251, 11.89004],
          [45.413274, 11.885259],
          [45.410397, 11.885259],
          [45.410427, 11.889987],
        ]).getBounds(),
      );
    }
  }

  /**
   * adds place information to the arrays ready to be submitted
   */
  public onDrawCreated(e: {layer: Polygon}): void {
    this.drawnItems.addLayer(e.layer);
    const points = e.layer.getLatLngs();
    const center = latLng(this.getCentroid(points[0] as LatLng[]));
    /*
     * get area information, not safe to use because of errors in leaflet library
     */
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
        if (name.length > 75) {
          name = name.substring(0, 75);
        }
        const mylatlngs: MyLatLng[] = [];
        (points[0] as LatLng[]).forEach((element) => {
          mylatlngs.push(new MyLatLng(200, 200, element));
        });
        this.organizationPlaces.push(
          new PlaceBuilder(
            -1,
            new PlaceDataBuilder(
              {
                address: data.address.road ? data.address.road : 'unknown',
                city: data.address.city ? data.address.city : 'unknown',
                zipcode: data.address.postcode ? data.address.postcode : 'unknown',
                state: data.address.country ? data.address.country : 'unknown',
              },
              name,
              mylatlngs,
              0,
            )
              .addColor(this.getRandomColor())
              .build(),
          )
            .addId(-1)
            .build(),
        );
        this.polygonLayers.push(
          e.layer.setStyle({
            color: this.organizationPlaces[this.organizationPlaces.length - 1].data.color
              ? this.organizationPlaces[this.organizationPlaces.length - 1].data.color
              : this.getRandomColor(),
          }),
        );
      });
  }

  /**
   * call OrganizationService to get organization with given Id
   */
  getOrgPlaces(id: number): void {
    this.placeService.getOrgPlaces(id).subscribe(
      (response: Place[]) => {
        const tempOrganizationPlaces = response;
        if (tempOrganizationPlaces.length !== 0) {
          const newbounds: LatLngBounds[] = [];
          for (const element of tempOrganizationPlaces) {
            const placeColor = this.getRandomColor();
            this.placeColors.push(placeColor);
            this.polygonLayers.push(
              polygon(this.getLatLng(element.data.polygon))
                .bindTooltip(
                  `<strong>
          ${element.data.name?.toString()}</strong>` +
                    `<br>${element.data.placeInfo.address}` +
                    ` - ${element.data.placeInfo.zipcode}
          ${element.data.placeInfo.city}`,
                )
                .setStyle({
                  color: element.data.color ? element.data.color : placeColor,
                }),
            );
            newbounds.push(polygon(this.getLatLng(element.data.polygon)).getBounds());
            this.organizationPlaces.push(element);
            this.totAlreadySaved += 1;
          }
          this.bounds = newbounds;
        }
      },
      (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
    );
  }

  getLatLng(newPolyline: {latitude: number; longitude: number}[]): LatLng[] {
    const latLngs: LatLng[] = [];
    for (const i of newPolyline) {
      latLngs.push(new LatLng(i.latitude, i.longitude));
    }
    return latLngs;
  }

  /**
   * returns all places colors
   */
  setColors(newColor: string, id: number): void {
    this.organizationPlaces[id].data.color = newColor;
    this.polygonLayers[id].setStyle({
      color: newColor,
    });
  }

  /**
   * returns a random hex color
   */
  getRandomColor(): string {
    const hexadecimalDigits = '0123456789ABCD';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexadecimalDigits[Math.floor(Math.random() * 14)];
    }
    return color;
  }

  checkNumberValidity(index: number, value: number): void {
    if (value > 1000 || value < 0) {
      this.organizationPlaces[index].data.maxConcurrentUsers = 0;
    }
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

  /**
   * delete place with the given id
   */
  deletePlace(id: number, idJustDrawed: number): void {
    if (id === -1) {
      if (idJustDrawed > -1) {
        this.organizationPlaces.splice(idJustDrawed, 1);
        this.drawnItems.removeLayer(
          this.polygonLayers[idJustDrawed - this.totAlreadySaved],
        );
        this.polygonLayers.splice(idJustDrawed - this.totAlreadySaved, 1);
      }
    } else {
      this.placeService
        .deletePlaceInOrg(+(this.route.snapshot.paramMap.get('id') as string), id)
        .subscribe(
          () => {},
          (err: Error) => this.snackBar.open(err.toString(), 'Ok'),
        );
      this.organizationPlaces.splice(idJustDrawed, 1);
      this.polygonLayers.splice(idJustDrawed, 1);
      this.totAlreadySaved -= 1;
    }
  }

  /**
   * update name and address of the place with the given id
   */
  updatePlace(idJustDrawed: number, name: string, address: string): void {
    if (idJustDrawed > -1) {
      this.organizationPlaces[idJustDrawed].data.name = name;
      this.organizationPlaces[idJustDrawed].data.placeInfo.address = address;
    }
  }

  /**
   * add places and/or update places data
   */
  editOrganizationPlaces(orgId: number): Observable<boolean> {
    let success = true;
    for (let iterator = 0; iterator < this.organizationPlaces.length; iterator++) {
      if (this.organizationPlaces[iterator].id === -1) {
        this.placeService
          .addPlaceToOrg(orgId, this.organizationPlaces[iterator].data)
          .subscribe((response: boolean) => {
            if (!response) {
              success = response;
            }
            if (iterator === this.organizationPlaces.length - 1) {
              if (response && success) {
                this.router.navigate([`organization/${orgId}`]);
              } else {
                this.snackBar.open(
                  'There was an internal error' +
                    'while updating your places, please try again!',
                  'Ok',
                );
              }
            }
          });
      } else {
        this.placeService
          .updatePlaceInOrg(orgId, this.organizationPlaces[iterator])
          .subscribe((response: boolean) => {
            if (!response) {
              success = response;
            }
            if (iterator === this.organizationPlaces.length - 1) {
              if (response && success) {
                this.router.navigate([`organization/${orgId}`]);
              } else {
                this.snackBar.open(
                  'There was an internal error' +
                    'while updating your places, please try again!',
                  'Ok',
                );
              }
            }
          });
      }
    }
    return of(success);
  }

  getRoute(): string {
    return this.router.url;
  }
}
