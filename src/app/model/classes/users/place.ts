import {LatLng} from 'leaflet';

import {PlaceData} from '../places/place-data';
import {MyLatLng} from '../places/my-lat-lng';

export interface Place {
  readonly id?: number;
  readonly name?: string;
  readonly polyline: MyLatLng[];
  readonly placeData?: PlaceData;

  getLatLng(polyline: MyLatLng[]): LatLng[];
}

export class PlaceBuilder {
  private id?: number;
  private name?: string;
  private placeData?: PlaceData;

  constructor(private polyline: MyLatLng[]) {}

  addId(id: number): PlaceBuilder {
    this.id = id;
    return this;
  }
  addName(name: string): PlaceBuilder {
    this.name = name;
    return this;
  }
  addPolyline(_polyline: MyLatLng[]): PlaceBuilder {
    this.polyline = _polyline;
    return this;
  }
  addPlaceData(placeData: PlaceData): PlaceBuilder {
    this.placeData = placeData;
    return this;
  }
  build(): Place {
    return {
      id: this.id,
      name: this.name,
      polyline: this.polyline,
      placeData: this.placeData,
      getLatLng: (newPolyline) => {
        const latLngs: LatLng[] = [];
        for (const i of newPolyline) {
          latLngs.push(i.LeafletLatLng);
        }
        return latLngs;
      },
    };
  }
}
