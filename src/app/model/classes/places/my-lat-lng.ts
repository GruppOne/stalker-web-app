import {LatLng} from 'leaflet';

export class MyLatLng {
  readonly latitude: number;
  readonly longitude: number;

  readonly leafletLatLng?: LatLng;

  constructor(latitude: number, longitude: number, leafletLatLng?: LatLng) {
    if (latitude === 200 && longitude === 200) {
      this.leafletLatLng = leafletLatLng as LatLng;
      this.latitude = this.leafletLatLng.lat;
      this.longitude = this.leafletLatLng.lng;
    } else {
      this.latitude = latitude;
      this.longitude = longitude;
      this.leafletLatLng = new LatLng(latitude, longitude);
    }
  }
  get LeafletLatLng(): LatLng {
    return new LatLng(this.latitude, this.longitude);
  }
  get Latitude(): number {
    return this.latitude;
  }
  get Longitude(): number {
    return this.longitude;
  }
}
