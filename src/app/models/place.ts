import {Polygon, LatLng} from 'leaflet';

import {PlaceData} from './place-data';
// import {Point} from './point';

export class Place {
  private id: number;
  private name: string;
  private polyline: Polygon;
  private placeData: PlaceData;
  constructor(
    id = -1,
    name = 'Torre Archimede',
    polyline = new Polygon([
      new LatLng(45.411564, 11.887473),
      new LatLng(45.411225, 11.887325),
      new LatLng(45.41111, 11.887784),
      new LatLng(45.41144, 11.88795),
    ]),
    placeData = new PlaceData(),
  ) {
    this.id = id;
    this.name = name;
    this.polyline = polyline;
    this.placeData = placeData;
  }

  get Id(): number {
    return this.id;
  }
  set Id(id: number) {
    this.id = id;
  }

  get Name(): string {
    return this.name;
  }
  set Name(name: string) {
    this.name = name;
  }

  get Polyline(): Polygon {
    return this.polyline;
  }
  set Polyline(polyline: Polygon) {
    this.polyline = polyline;
  }
  get PlaceData(): PlaceData {
    return this.placeData;
  }
  set PlaceData(placeData: PlaceData) {
    this.placeData = placeData;
  }
}
