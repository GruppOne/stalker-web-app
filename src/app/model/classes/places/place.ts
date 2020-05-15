import {LatLng} from 'leaflet';

import {MyLatLng} from './my-lat-lng';
import {PlaceData} from './place-data';

export interface Place {
  readonly id: number;
  readonly data: PlaceData;

  getLatLng(polyline: MyLatLng[]): LatLng[];
}

export class PlaceBuilder {
  constructor(private id: number, private placeData: PlaceData) {}

  addId(id: number): PlaceBuilder {
    this.id = id;
    return this;
  }
  addPlaceData(placeData: PlaceData): PlaceBuilder {
    this.placeData = placeData;
    return this;
  }
  build(): Place {
    return {
      id: this.id,
      data: this.placeData,
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
