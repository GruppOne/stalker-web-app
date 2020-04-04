import {Polygon} from 'leaflet';

import {PlaceBuilder} from './place';
import {PlaceDataBuilder} from './place-data';
// import {Point} from './point';

describe('Place', () => {
  const placeBuilder = new PlaceBuilder(new Polygon([]));
  it('should create an instance', () => {
    expect(placeBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newName = 'TestName';
    const newPolyline = new Polygon([]);
    const newPlaceData = new PlaceDataBuilder(
      'Via Trieste',
      'Padova',
      35010,
      'Italia',
    ).build();
    placeBuilder.setId(newId);
    placeBuilder.setName(newName);
    placeBuilder.setPolyline(newPolyline);
    placeBuilder.setPlaceData(newPlaceData);
    const place = placeBuilder.build();
    expect(place.id).toEqual(newId);
    expect(place.name).toEqual(newName);
    expect(place.polyline).toEqual(newPolyline);
    expect(place.placeData).toEqual(newPlaceData);
  });
});
