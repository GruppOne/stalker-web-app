export class Polyline {
  private latitude: number;
  private longitude: number;
  constructor(latitude = 0, longitude = 0) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  setLatitude(latitude: number): void {
    this.latitude = latitude;
  }

  setLongitude(longitude: number): void {
    this.longitude = longitude;
  }
}
