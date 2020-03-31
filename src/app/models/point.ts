export class Point {
  private latitude: number;
  private longitude: number;
  constructor(latitude = 0, longitude = 0) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  get Latitude(): number {
    return this.latitude;
  }
  set Latitude(latitude: number) {
    this.latitude = latitude;
  }

  get Longitude(): number {
    return this.longitude;
  }
  set Longitude(longitude: number) {
    this.longitude = longitude;
  }
}
