import {LatLng} from 'leaflet';

import {MyLatLng} from './my-lat-lng';

describe('MyLatLng', () => {
  it('should create an instance with leaflet LatLng data ', () => {
    expect(new MyLatLng(200, 200, new LatLng(12, 12))).toBeTruthy();
  });
  it('should create an instance ', () => {
    expect(new MyLatLng(12, 12)).toBeTruthy();
  });
  it('should correctly get Latitude ', () => {
    const point = new MyLatLng(12, 11);
    expect(point.Latitude).toEqual(12);
  });
  it('should correctly get Longitude ', () => {
    const point = new MyLatLng(12, 11);
    expect(point.Longitude).toEqual(11);
  });
});
