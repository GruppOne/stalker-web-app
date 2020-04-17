import {PlaceDataBuilder} from '../places/place-data';
import {MyLatLng} from '../places/my-lat-lng';
import {PlaceBuilder} from '../places/place';

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
  });
});
