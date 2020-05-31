import {MyLatLng} from './my-lat-lng';
import {PlaceDataBuilder} from './place-data';

describe('PlaceData', () => {
  const placeDataBuilder = new PlaceDataBuilder(
    {
      address: 'Via Trieste',
      city: 'Padova',
      zipcode: '35010',
      state: 'Italia',
    },
    'Torre Archimede',
    [],
    10,
  );
  it('should create an instance', () => {
    expect(placeDataBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newPlaceInfo = {
      address: 'Main Street',
      city: 'LasVegas',
      zipcode: '12120',
      state: 'USA',
    };
    placeDataBuilder.addPolygon([new MyLatLng(1, 1)]);
    placeDataBuilder.addName('newName');
    placeDataBuilder.addPlaceInfo(newPlaceInfo);
    const placeData = placeDataBuilder.build();
    expect(placeData.polygon).toEqual([new MyLatLng(1, 1)]);
    expect(placeData.name).toEqual('newName');
    expect(placeData.placeInfo).toEqual(newPlaceInfo);
  });
});
