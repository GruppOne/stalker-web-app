import {LatLng} from 'leaflet';

export class MyLatLng {
  private readonly latitude: number;
  private readonly longitude: number;

  private readonly leafletLatLng: LatLng;

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
    return this.leafletLatLng;
  }
  get Latitude(): number {
    return this.latitude;
  }
  get Longitude(): number {
    return this.longitude;
  }
}
