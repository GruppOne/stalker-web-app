import {PlaceData} from './place-data';

describe('PlaceData', () => {
  const placeData = new PlaceData();
  it('should create an instance', () => {
    expect(new PlaceData()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newAddress = 'Main Street';
    const newCity = 'Las Vegas';
    const newZipcode = 12120;
    const newState = 'USA';
    placeData.Address = newAddress;
    placeData.City = newCity;
    placeData.Zipcode = newZipcode;
    placeData.State = newState;
    expect(placeData.Address).toEqual(newAddress);
    expect(placeData.City).toEqual(newCity);
    expect(placeData.Zipcode).toEqual(newZipcode);
    expect(placeData.State).toEqual(newState);
  });
});
