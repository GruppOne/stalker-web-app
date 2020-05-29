import {MyLatLng} from './my-lat-lng';

export interface PlaceData {
  name?: string;
  maxConcurrentUsers: number;
  readonly color?: string;
  readonly polygon: MyLatLng[];
  readonly placeInfo: PlaceInfo;
}

export interface PlaceInfo {
  address: string;
  readonly city: string;
  readonly zipcode: string;
  readonly state: string;
}

export class PlaceDataBuilder {
  private color?: string;
  constructor(
    private placeInfo: PlaceInfo,
    private name: string,
    private polyline: MyLatLng[],
    private maxConcurrentUsers: number,
  ) {}
  addPlaceInfo(placeInfo: PlaceInfo): PlaceDataBuilder {
    this.placeInfo = placeInfo;
    return this;
  }
  addName(name: string): PlaceDataBuilder {
    this.name = name;
    return this;
  }
  addPolygon(polygon: MyLatLng[]): PlaceDataBuilder {
    this.polyline = polygon;
    return this;
  }
  addMaxConcurrentUsers(maxConcurrentUsers: number): PlaceDataBuilder {
    this.maxConcurrentUsers = maxConcurrentUsers;
    return this;
  }
  addColor(color: string): PlaceDataBuilder {
    this.color = color;
    return this;
  }
  build(): PlaceData {
    return {
      name: this.name,
      polygon: this.polyline,
      placeInfo: this.placeInfo,
      maxConcurrentUsers: this.maxConcurrentUsers,
      color: this.color,
    };
  }
}
