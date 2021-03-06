import {PlaceBuilder} from './place';
import {PlaceDataBuilder} from './place-data';

// import {Point} from './point';
const testPlaceInfo = {
  address: 'test',
  city: 'test',
  zipcode: 'test',
  state: 'test',
};
describe('Place', () => {
  const placeBuilder = new PlaceBuilder(
    -1,
    new PlaceDataBuilder(testPlaceInfo, 'test', [], 10).build(),
  );
  it('should create an instance', () => {
    expect(placeBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newPlaceData = new PlaceDataBuilder(
      {
        address: 'Via Trieste',
        city: 'Padova',
        zipcode: '35010',
        state: 'Italia',
      },
      'Torre Archimede',
      [],
      10,
    ).build();
    placeBuilder.addId(newId);
    placeBuilder.addPlaceData(newPlaceData);
    const place = placeBuilder.build();
    expect(place.id).toEqual(newId);
    expect(place.data).toEqual(newPlaceData);
  });
});
