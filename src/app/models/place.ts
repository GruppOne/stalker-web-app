import {Polygon} from 'leaflet';

import {PlaceData} from './place-data';

export interface Place {
  readonly id?: number;
  readonly name?: string;
  readonly polyline: Polygon;
  readonly placeData?: PlaceData;
}

export class PlaceBuilder {
  private id?: number;
  private name?: string;
  private placeData?: PlaceData;

  constructor(private polyline: Polygon) {}

  setId(id: number): PlaceBuilder {
    this.id = id;
    return this;
  }
  setName(name: string): PlaceBuilder {
    this.name = name;
    return this;
  }
  setPolyline(polyline: Polygon): PlaceBuilder {
    this.polyline = polyline;
    return this;
  }
  setPlaceData(placeData: PlaceData): PlaceBuilder {
    this.placeData = placeData;
    return this;
  }
  build(): Place {
    return {
      id: this.id,
      name: this.name,
      polyline: this.polyline,
      placeData: this.placeData,
    };
  }
}
