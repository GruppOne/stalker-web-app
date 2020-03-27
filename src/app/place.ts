import {Polyline} from './polyline';
import {PlaceData} from './placeData';

export class Place {
  private id: number;
  private name: string;
  private polyline: Polyline;
  private placeData: PlaceData;
  constructor(
    id = -1,
    name = 'cipolla',
    polyline = new Polyline(),
    placeData = new PlaceData(),
  ) {
    this.id = id;
    this.name = name;
    this.polyline = polyline;
    this.placeData = placeData;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPolyline(): Polyline {
    return this.polyline;
  }

  getPlaceData(): PlaceData {
    return this.placeData;
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setPolyline(polyline: Polyline): void {
    this.polyline = polyline;
  }

  setPlaceData(placeData: PlaceData): void {
    this.placeData = placeData;
  }
}
