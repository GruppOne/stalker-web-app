import {MyLatLng} from './my-lat-lng';

export interface PlaceData {
  readonly name?: string;
  readonly polygon: MyLatLng[];
  readonly placeInfo: PlaceInfo;
}

export interface PlaceInfo {
  readonly address: string;
  readonly city: string;
  readonly zipcode: string;
  readonly state: string;
}

export class PlaceDataBuilder {
  constructor(
    private placeInfo: PlaceInfo,
    private name: string,
    private polyline: MyLatLng[],
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
  build(): PlaceData {
    return {
      name: this.name,
      polygon: this.polyline,
      placeInfo: this.placeInfo,
    };
  }
}
