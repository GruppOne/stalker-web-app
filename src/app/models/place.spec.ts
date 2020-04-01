import {Place} from './place';
import {PlaceData} from './place-data';
// import {Point} from './point';

describe('Place', () => {
  const place = new Place();
  it('should create an instance', () => {
    expect(new Place()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newName = 'TestName';
    const newPolyline = [new Point(), new Point()];
    const newPlaceData = new PlaceData();
    place.Id = newId;
    place.Name = newName;
    place.Polyline = newPolyline;
    place.PlaceData = newPlaceData;
    expect(place.Id).toEqual(newId);
    expect(place.Name).toEqual(newName);
    expect(place.Polyline).toEqual(newPolyline);
    expect(place.PlaceData).toEqual(newPlaceData);
  });
});
