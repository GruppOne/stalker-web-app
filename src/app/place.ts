import {Point} from './point';
import {PlaceData} from './place-data';

export class Place {
  private id: number;
  private name: string;
  private polyline: Point[];
  private placeData: PlaceData;
  constructor(
    id = -1,
    name = 'cipolla',
    polyline = [new Point()],
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

  get Polyline(): Point[] {
    return this.polyline;
  }
  set Polyline(polyline: Point[]) {
    this.polyline = polyline;
  }
  get PlaceData(): PlaceData {
    return this.placeData;
  }
  set PlaceData(placeData: PlaceData) {
    this.placeData = placeData;
  }
}
