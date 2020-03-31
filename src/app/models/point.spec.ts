import {Point} from './point';

describe('Point', () => {
  const point = new Point();
  it('should create an instance', () => {
    expect(new Point()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newLatitude = -1;
    const newLongitude = -1;
    point.Latitude = newLatitude;
    point.Longitude = newLongitude;
    expect(point.Latitude).toEqual(newLatitude);
    expect(point.Longitude).toEqual(newLongitude);
  });
});
