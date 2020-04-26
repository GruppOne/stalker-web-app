import {latLng} from 'leaflet';

import {MyLatLng} from './my-lat-lng';
import {PlaceBuilder} from './place';
import {PlaceDataBuilder} from './place-data';

// import {Point} from './point';

describe('Place', () => {
  const placeBuilder = new PlaceBuilder([]);
  it('should create an instance', () => {
    expect(placeBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newName = 'TestName';
    const newPolyline: MyLatLng[] = [];
    const newPlaceData = new PlaceDataBuilder(
      'Via Trieste',
      'Padova',
      '35010',
      'Italia',
    ).build();
    placeBuilder.addId(newId);
    placeBuilder.addName(newName);
    placeBuilder.addPolyline(newPolyline);
    placeBuilder.addPlaceData(newPlaceData);
    const place = placeBuilder.build();
    expect(place.id).toEqual(newId);
    expect(place.name).toEqual(newName);
    expect(place.polyline).toEqual(newPolyline);
    expect(place.placeData).toEqual(newPlaceData);
    expect(place.getLatLng([new MyLatLng(1, 1)])).toEqual([latLng(1, 1)]);
  });
});
