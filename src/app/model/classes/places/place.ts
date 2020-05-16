import {PlaceData} from './place-data';

export interface Place {
  readonly id: number;
  readonly data: PlaceData;
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
    };
  }
}
