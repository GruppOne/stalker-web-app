import {PlaceDataBuilder} from './place-data';

describe('PlaceData', () => {
  const placeDataBuilder = new PlaceDataBuilder(
    'Via Trieste',
    'Padova',
    '35010',
    'Italia',
  );
  it('should create an instance', () => {
    expect(placeDataBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newAddress = 'Main Street';
    const newCity = 'Las Vegas';
    const newZipcode = '12120';
    const newState = 'USA';
    placeDataBuilder.addAddress(newAddress);
    placeDataBuilder.addCity(newCity);
    placeDataBuilder.addZipcode(newZipcode);
    placeDataBuilder.addState(newState);
    const placeData = placeDataBuilder.build();
    expect(placeData.address).toEqual(newAddress);
    expect(placeData.city).toEqual(newCity);
    expect(placeData.zipcode).toEqual(newZipcode);
    expect(placeData.state).toEqual(newState);
  });
});
